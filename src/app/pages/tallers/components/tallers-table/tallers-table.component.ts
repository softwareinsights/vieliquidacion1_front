import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TallersInterface } from './tallers.interface';
import { TallersResponseInterface } from './tallers-response.interface';
import { Component, OnInit } from '@angular/core';
import { TallersService } from './tallers.service';
import { TallersAddModalComponent } from './tallers-add-modal/tallers-add-modal.component';
import { TallersEditModalComponent } from './tallers-edit-modal/tallers-edit-modal.component';
@Component({
selector: 'tallers-table',
templateUrl: './tallers-table.html',
styleUrls: ['./tallers-table.scss'],
})
export class TallersTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtaller';
    sortOrder = 'asc';
    constructor(
      private service: TallersService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TallersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(tallers: TallersInterface) {
      const disposable = this.dialogService.addDialog(TallersEditModalComponent, tallers)
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
          this.service.remove(item.idtaller)
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
            (data: TallersResponseInterface) =>  {
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
