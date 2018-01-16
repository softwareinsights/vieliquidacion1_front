import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PagobonificacionsInterface } from './pagobonificacions.interface';
import { PagobonificacionsResponseInterface } from './pagobonificacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { PagobonificacionsService } from './pagobonificacions.service';
import { PagobonificacionsAddModalComponent } from './pagobonificacions-add-modal/pagobonificacions-add-modal.component';
import { PagobonificacionsEditModalComponent } from './pagobonificacions-edit-modal/pagobonificacions-edit-modal.component';
@Component({
selector: 'pagobonificacions-table',
templateUrl: './pagobonificacions-table.html',
styleUrls: ['./pagobonificacions-table.scss'],
})
export class PagobonificacionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpagobonificacion';
    sortOrder = 'asc';
    constructor(
      private service: PagobonificacionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PagobonificacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(pagobonificacions: PagobonificacionsInterface) {
      const disposable = this.dialogService.addDialog(PagobonificacionsEditModalComponent, pagobonificacions)
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
          this.service.remove(item.idpagobonificacion)
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
            (data: PagobonificacionsResponseInterface) =>  {
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
