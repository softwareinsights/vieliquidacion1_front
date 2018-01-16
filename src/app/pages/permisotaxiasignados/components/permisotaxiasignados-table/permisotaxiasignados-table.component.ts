import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxiasignadosInterface } from './permisotaxiasignados.interface';
import { PermisotaxiasignadosResponseInterface } from './permisotaxiasignados-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxiasignadosService } from './permisotaxiasignados.service';
import { PermisotaxiasignadosAddModalComponent } from './permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
import { PermisotaxiasignadosEditModalComponent } from './permisotaxiasignados-edit-modal/permisotaxiasignados-edit-modal.component';
@Component({
selector: 'permisotaxiasignados-table',
templateUrl: './permisotaxiasignados-table.html',
styleUrls: ['./permisotaxiasignados-table.scss'],
})
export class PermisotaxiasignadosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisotaxiasignado';
    sortOrder = 'asc';
    constructor(
      private service: PermisotaxiasignadosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(permisotaxiasignados: PermisotaxiasignadosInterface) {
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosEditModalComponent, permisotaxiasignados)
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
          this.service.remove(item.idpermisotaxiasignado)
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
            (data: PermisotaxiasignadosResponseInterface) =>  {
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
