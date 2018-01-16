import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PagosInterface } from './pagos.interface';
import { PagosResponseInterface } from './pagos-response.interface';
import { Component, OnInit } from '@angular/core';
import { PagosService } from './pagos.service';
import { PagosAddModalComponent } from './pagos-add-modal/pagos-add-modal.component';
import { PagosEditModalComponent } from './pagos-edit-modal/pagos-edit-modal.component';
@Component({
selector: 'pagos-table',
templateUrl: './pagos-table.html',
styleUrls: ['./pagos-table.scss'],
})
export class PagosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpago';
    sortOrder = 'asc';
    constructor(
      private service: PagosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PagosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(pagos: PagosInterface) {
      const disposable = this.dialogService.addDialog(PagosEditModalComponent, pagos)
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
          this.service.remove(item.idpago)
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
            (data: PagosResponseInterface) =>  {
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
