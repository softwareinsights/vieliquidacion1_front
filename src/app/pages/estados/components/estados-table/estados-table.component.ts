import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EstadosInterface } from './estados.interface';
import { EstadosResponseInterface } from './estados-response.interface';
import { Component, OnInit } from '@angular/core';
import { EstadosService } from './estados.service';
import { EstadosAddModalComponent } from './estados-add-modal/estados-add-modal.component';
import { EstadosEditModalComponent } from './estados-edit-modal/estados-edit-modal.component';
@Component({
selector: 'estados-table',
templateUrl: './estados-table.html',
styleUrls: ['./estados-table.scss'],
})
export class EstadosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idestado';
    sortOrder = 'asc';
    constructor(
      private service: EstadosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EstadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(estados: EstadosInterface) {
      const disposable = this.dialogService.addDialog(EstadosEditModalComponent, estados)
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
          this.service.remove(item.idestado)
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
            (data: EstadosResponseInterface) =>  {
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
