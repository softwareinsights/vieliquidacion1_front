import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ChofersInterface } from './chofers.interface';
import { ChofersResponseInterface } from './chofers-response.interface';
import { Component, OnInit } from '@angular/core';
import { ChofersService } from './chofers.service';
import { ChofersAddModalComponent } from './chofers-add-modal/chofers-add-modal.component';
import { ChofersEditModalComponent } from './chofers-edit-modal/chofers-edit-modal.component';
@Component({
selector: 'chofers-table',
templateUrl: './chofers-table.html',
styleUrls: ['./chofers-table.scss'],
})
export class ChofersTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idchofer';
    sortOrder = 'asc';
    constructor(
      private service: ChofersService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ChofersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(chofers: ChofersInterface) {
      const disposable = this.dialogService.addDialog(ChofersEditModalComponent, chofers)
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
          this.service.remove(item.idchofer)
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
            (data: ChofersResponseInterface) =>  {
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
