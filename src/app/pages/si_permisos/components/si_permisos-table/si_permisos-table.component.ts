import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Si_permisosInterface } from './si_permisos.interface';
import { Si_permisosResponseInterface } from './si_permisos-response.interface';
import { Component, OnInit } from '@angular/core';
import { Si_permisosService } from './si_permisos.service';
import { Si_permisosAddModalComponent } from './si_permisos-add-modal/si_permisos-add-modal.component';
import { Si_permisosEditModalComponent } from './si_permisos-edit-modal/si_permisos-edit-modal.component';
@Component({
selector: 'si_permisos-table',
templateUrl: './si_permisos-table.html',
styleUrls: ['./si_permisos-table.scss'],
})
export class Si_permisosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsi_permiso';
    sortOrder = 'asc';
    constructor(
      private service: Si_permisosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(Si_permisosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(si_permisos: Si_permisosInterface) {
      const disposable = this.dialogService.addDialog(Si_permisosEditModalComponent, si_permisos)
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
          this.service.remove(item.idsi_permiso)
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
            (data: Si_permisosResponseInterface) =>  {
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
