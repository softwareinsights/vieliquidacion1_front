import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EnviotallersInterface } from './enviotallers.interface';
import { EnviotallersResponseInterface } from './enviotallers-response.interface';
import { Component, OnInit } from '@angular/core';
import { EnviotallersService } from './enviotallers.service';
import { EnviotallersAddModalComponent } from './enviotallers-add-modal/enviotallers-add-modal.component';
import { EnviotallersEditModalComponent } from './enviotallers-edit-modal/enviotallers-edit-modal.component';
@Component({
selector: 'enviotallers-table',
templateUrl: './enviotallers-table.html',
styleUrls: ['./enviotallers-table.scss'],
})
export class EnviotallersTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idenviotaller';
    sortOrder = 'asc';
    constructor(
      private service: EnviotallersService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EnviotallersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(enviotallers: EnviotallersInterface) {
      const disposable = this.dialogService.addDialog(EnviotallersEditModalComponent, enviotallers)
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
          this.service.remove(item.idenviotaller)
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
            (data: EnviotallersResponseInterface) =>  {
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
