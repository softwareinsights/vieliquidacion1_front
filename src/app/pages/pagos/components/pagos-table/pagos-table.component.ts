import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PagosInterface } from './pagos.interface';
import { PagosResponseInterface } from './pagos-response.interface';
import { Component, OnInit } from '@angular/core';
import { PagosService } from './pagos.service';
import { PagosAddModalComponent } from './pagos-add-modal/pagos-add-modal.component';
import { PagosEditModalComponent } from './pagos-edit-modal/pagos-edit-modal.component';
import { PagobonificacionsInterface } from './../../../pagobonificacions/components/pagobonificacions-table/pagobonificacions.interface';
import { PagobonificacionsAddModalComponent } from './../../../pagobonificacions/components/pagobonificacions-table/pagobonificacions-add-modal/pagobonificacions-add-modal.component';
import { PagofianzasInterface } from './../../../pagofianzas/components/pagofianzas-table/pagofianzas.interface';
import { PagofianzasAddModalComponent } from './../../../pagofianzas/components/pagofianzas-table/pagofianzas-add-modal/pagofianzas-add-modal.component';
import { PagoliquidacionsInterface } from './../../../pagoliquidacions/components/pagoliquidacions-table/pagoliquidacions.interface';
import { PagoliquidacionsAddModalComponent } from './../../../pagoliquidacions/components/pagoliquidacions-table/pagoliquidacions-add-modal/pagoliquidacions-add-modal.component';

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
    backpage: boolean;

    constructor(
      private service: PagosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idchofer'] !== undefined) {
          const idchofer = +params['idchofer'];
          this.findByIdChofer(idchofer);
          this.backpage = true;
        }
        if (params['idestado'] !== undefined) {
          const idestado = +params['idestado'];
          this.findByIdEstado(idestado);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdChofer(id: number): void {
      this.service
        .findByIdChofer(id)
        .subscribe(
            (data: PagosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdEstado(id: number): void {
      this.service
        .findByIdEstado(id)
        .subscribe(
            (data: PagosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    backPage() {
        window.history.back();
    }
    insertPagobonificacion(pagos: PagosInterface) {
      const pagobonificacion: PagobonificacionsInterface = {
        pago_idpago: pagos.idpago
      }
      const disposable = this.dialogService.addDialog(PagobonificacionsAddModalComponent, pagobonificacion)
      .subscribe( data => {
          if (data) {
          this.pagobonificacionShowToast(data);
          }
      });
    }
    pagobonificacionShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPagobonificacion(pagos: PagosInterface) {
      this.router.navigate([`/pages/pagobonificacions/pago/${pagos.idpago}`]);
    }
    insertPagofianza(pagos: PagosInterface) {
      const pagofianza: PagofianzasInterface = {
        pago_idpago: pagos.idpago
      }
      const disposable = this.dialogService.addDialog(PagofianzasAddModalComponent, pagofianza)
      .subscribe( data => {
          if (data) {
          this.pagofianzaShowToast(data);
          }
      });
    }
    pagofianzaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPagofianza(pagos: PagosInterface) {
      this.router.navigate([`/pages/pagofianzas/pago/${pagos.idpago}`]);
    }
    insertPagoliquidacion(pagos: PagosInterface) {
      const pagoliquidacion: PagoliquidacionsInterface = {
        pago_idpago: pagos.idpago
      }
      const disposable = this.dialogService.addDialog(PagoliquidacionsAddModalComponent, pagoliquidacion)
      .subscribe( data => {
          if (data) {
          this.pagoliquidacionShowToast(data);
          }
      });
    }
    pagoliquidacionShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPagoliquidacion(pagos: PagosInterface) {
      this.router.navigate([`/pages/pagoliquidacions/pago/${pagos.idpago}`]);
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
