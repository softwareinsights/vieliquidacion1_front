import { PagosAddModalComponent } from './../../../pagos/components/pagos-table/pagos-add-modal/pagos-add-modal.component';
import { PagosInterface } from './../../../pagos/components/pagos-table/pagos.interface';
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

    addPagoModalShow(chofers: ChofersInterface) {

      const date = new Date();
      const month = (date.getMonth() + 1);
      const now = date.getFullYear() + "-" + ((month < 10) ? "0" : "") + month + "-" + date.getDate();
      const hour = date.getHours() + ":" + date.getMinutes();

      // Envio a pago
      const pago: PagosInterface = {
        cantidadRecibida: 0,
        cambio: 0,
        kilometraje: 0,
        fecha: now,
        hora: hour,
        nota: '',
        cantPagada: 0,
        estado_idestado: 6,
        folio: '',
        liquidacion: chofers.deudaliquidacion,
        foliofianza: '',
        fianza: chofers.deudafianza,
        chofer_idchofer: chofers.idchofer
      }

      const disposable = this.dialogService.addDialog(PagosAddModalComponent, pago)
      .subscribe( data => {
          if (data) {
            if (data.success) {

              console.log("data addPagoModalShow", data);


            }
            this.showToast(data);
          }
      });
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
