import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PagofianzasInterface } from './pagofianzas.interface';
import { PagofianzasResponseInterface } from './pagofianzas-response.interface';
import { Component, OnInit } from '@angular/core';
import { PagofianzasService } from './pagofianzas.service';
import { PagofianzasAddModalComponent } from './pagofianzas-add-modal/pagofianzas-add-modal.component';
import { PagofianzasEditModalComponent } from './pagofianzas-edit-modal/pagofianzas-edit-modal.component';
@Component({
selector: 'pagofianzas-table',
templateUrl: './pagofianzas-table.html',
styleUrls: ['./pagofianzas-table.scss'],
})
export class PagofianzasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpagofianza';
    sortOrder = 'asc';
    constructor(
      private service: PagofianzasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PagofianzasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(pagofianzas: PagofianzasInterface) {
      const disposable = this.dialogService.addDialog(PagofianzasEditModalComponent, pagofianzas)
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
          this.service.remove(item.idpagofianza)
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
            (data: PagofianzasResponseInterface) =>  {
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
