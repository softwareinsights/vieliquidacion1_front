import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { BonificacionsInterface } from './bonificacions.interface';
import { BonificacionsResponseInterface } from './bonificacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { BonificacionsService } from './bonificacions.service';
import { BonificacionsAddModalComponent } from './bonificacions-add-modal/bonificacions-add-modal.component';
import { BonificacionsEditModalComponent } from './bonificacions-edit-modal/bonificacions-edit-modal.component';
@Component({
selector: 'bonificacions-table',
templateUrl: './bonificacions-table.html',
styleUrls: ['./bonificacions-table.scss'],
})
export class BonificacionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idbonificacion';
    sortOrder = 'asc';
    constructor(
      private service: BonificacionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(BonificacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(bonificacions: BonificacionsInterface) {
      const disposable = this.dialogService.addDialog(BonificacionsEditModalComponent, bonificacions)
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
          this.service.remove(item.idbonificacion)
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
            (data: BonificacionsResponseInterface) =>  {
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
