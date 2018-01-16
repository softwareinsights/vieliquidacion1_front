import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { VehiculoreparandosInterface } from './vehiculoreparandos.interface';
import { VehiculoreparandosResponseInterface } from './vehiculoreparandos-response.interface';
import { Component, OnInit } from '@angular/core';
import { VehiculoreparandosService } from './vehiculoreparandos.service';
import { VehiculoreparandosAddModalComponent } from './vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';
import { VehiculoreparandosEditModalComponent } from './vehiculoreparandos-edit-modal/vehiculoreparandos-edit-modal.component';
@Component({
selector: 'vehiculoreparandos-table',
templateUrl: './vehiculoreparandos-table.html',
styleUrls: ['./vehiculoreparandos-table.scss'],
})
export class VehiculoreparandosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idvehiculoreparando';
    sortOrder = 'asc';
    constructor(
      private service: VehiculoreparandosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(VehiculoreparandosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(vehiculoreparandos: VehiculoreparandosInterface) {
      const disposable = this.dialogService.addDialog(VehiculoreparandosEditModalComponent, vehiculoreparandos)
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
          this.service.remove(item.idvehiculoreparando)
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
            (data: VehiculoreparandosResponseInterface) =>  {
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
