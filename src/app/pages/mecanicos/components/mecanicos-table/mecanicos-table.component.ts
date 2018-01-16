import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { MecanicosInterface } from './mecanicos.interface';
import { MecanicosResponseInterface } from './mecanicos-response.interface';
import { Component, OnInit } from '@angular/core';
import { MecanicosService } from './mecanicos.service';
import { MecanicosAddModalComponent } from './mecanicos-add-modal/mecanicos-add-modal.component';
import { MecanicosEditModalComponent } from './mecanicos-edit-modal/mecanicos-edit-modal.component';
@Component({
selector: 'mecanicos-table',
templateUrl: './mecanicos-table.html',
styleUrls: ['./mecanicos-table.scss'],
})
export class MecanicosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idmecanico';
    sortOrder = 'asc';
    constructor(
      private service: MecanicosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(MecanicosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(mecanicos: MecanicosInterface) {
      const disposable = this.dialogService.addDialog(MecanicosEditModalComponent, mecanicos)
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
          this.service.remove(item.idmecanico)
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
            (data: MecanicosResponseInterface) =>  {
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
