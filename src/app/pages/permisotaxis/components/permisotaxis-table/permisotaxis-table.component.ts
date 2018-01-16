import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxisInterface } from './permisotaxis.interface';
import { PermisotaxisResponseInterface } from './permisotaxis-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxisService } from './permisotaxis.service';
import { PermisotaxisAddModalComponent } from './permisotaxis-add-modal/permisotaxis-add-modal.component';
import { PermisotaxisEditModalComponent } from './permisotaxis-edit-modal/permisotaxis-edit-modal.component';
@Component({
selector: 'permisotaxis-table',
templateUrl: './permisotaxis-table.html',
styleUrls: ['./permisotaxis-table.scss'],
})
export class PermisotaxisTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisotaxi';
    sortOrder = 'asc';
    constructor(
      private service: PermisotaxisService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxisAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(permisotaxis: PermisotaxisInterface) {
      const disposable = this.dialogService.addDialog(PermisotaxisEditModalComponent, permisotaxis)
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
          this.service.remove(item.idpermisotaxi)
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
            (data: PermisotaxisResponseInterface) =>  {
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
