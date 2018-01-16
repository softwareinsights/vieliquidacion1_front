import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Si_modulosInterface } from './si_modulos.interface';
import { Si_modulosResponseInterface } from './si_modulos-response.interface';
import { Component, OnInit } from '@angular/core';
import { Si_modulosService } from './si_modulos.service';
import { Si_modulosAddModalComponent } from './si_modulos-add-modal/si_modulos-add-modal.component';
import { Si_modulosEditModalComponent } from './si_modulos-edit-modal/si_modulos-edit-modal.component';
@Component({
selector: 'si_modulos-table',
templateUrl: './si_modulos-table.html',
styleUrls: ['./si_modulos-table.scss'],
})
export class Si_modulosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsi_modulo';
    sortOrder = 'asc';
    constructor(
      private service: Si_modulosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(Si_modulosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(si_modulos: Si_modulosInterface) {
      const disposable = this.dialogService.addDialog(Si_modulosEditModalComponent, si_modulos)
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
          this.service.remove(item.idsi_modulo)
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
            (data: Si_modulosResponseInterface) =>  {
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
