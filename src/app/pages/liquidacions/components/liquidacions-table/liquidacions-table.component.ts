import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { LiquidacionsInterface } from './liquidacions.interface';
import { LiquidacionsResponseInterface } from './liquidacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { LiquidacionsService } from './liquidacions.service';
import { LiquidacionsAddModalComponent } from './liquidacions-add-modal/liquidacions-add-modal.component';
import { LiquidacionsEditModalComponent } from './liquidacions-edit-modal/liquidacions-edit-modal.component';
@Component({
selector: 'liquidacions-table',
templateUrl: './liquidacions-table.html',
styleUrls: ['./liquidacions-table.scss'],
})
export class LiquidacionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idliquidacion';
    sortOrder = 'asc';
    constructor(
      private service: LiquidacionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(LiquidacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(liquidacions: LiquidacionsInterface) {
      const disposable = this.dialogService.addDialog(LiquidacionsEditModalComponent, liquidacions)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    onDeleteConfirm(event, item): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
          this.service.remove(item.idliquidacion)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }
    showToast(result) {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: LiquidacionsResponseInterface) =>  {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
