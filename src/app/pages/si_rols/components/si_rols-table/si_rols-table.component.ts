import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Si_rolsInterface } from './si_rols.interface';
import { Si_rolsResponseInterface } from './si_rols-response.interface';
import { Component, OnInit } from '@angular/core';
import { Si_rolsService } from './si_rols.service';
import { Si_rolsAddModalComponent } from './si_rols-add-modal/si_rols-add-modal.component';
import { Si_rolsEditModalComponent } from './si_rols-edit-modal/si_rols-edit-modal.component';
@Component({
selector: 'si_rols-table',
templateUrl: './si_rols-table.html',
styleUrls: ['./si_rols-table.scss'],
})
export class Si_rolsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsi_rol';
    sortOrder = 'asc';
    constructor(
      private service: Si_rolsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(Si_rolsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(si_rols: Si_rolsInterface) {
      const disposable = this.dialogService.addDialog(Si_rolsEditModalComponent, si_rols)
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
          this.service.remove(item.idsi_rol)
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
            (data: Si_rolsResponseInterface) =>  {
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
