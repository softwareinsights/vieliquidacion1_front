import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { RefaccionsInterface } from './refaccions.interface';
import { RefaccionsResponseInterface } from './refaccions-response.interface';
import { Component, OnInit } from '@angular/core';
import { RefaccionsService } from './refaccions.service';
import { RefaccionsAddModalComponent } from './refaccions-add-modal/refaccions-add-modal.component';
import { RefaccionsEditModalComponent } from './refaccions-edit-modal/refaccions-edit-modal.component';
@Component({
selector: 'refaccions-table',
templateUrl: './refaccions-table.html',
styleUrls: ['./refaccions-table.scss'],
})
export class RefaccionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idrefaccion';
    sortOrder = 'asc';
    constructor(
      private service: RefaccionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(RefaccionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(refaccions: RefaccionsInterface) {
      const disposable = this.dialogService.addDialog(RefaccionsEditModalComponent, refaccions)
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
          this.service.remove(item.idrefaccion)
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
            (data: RefaccionsResponseInterface) =>  {
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
