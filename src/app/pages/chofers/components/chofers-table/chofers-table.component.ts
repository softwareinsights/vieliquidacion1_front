import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ChofersInterface } from './chofers.interface';
import { ChofersResponseInterface } from './chofers-response.interface';
import { Component, OnInit } from '@angular/core';
import { ChofersService } from './chofers.service';
import { ChofersAddModalComponent } from './chofers-add-modal/chofers-add-modal.component';
import { ChofersEditModalComponent } from './chofers-edit-modal/chofers-edit-modal.component';
import { BonificacionsInterface } from './../../../bonificacions/components/bonificacions-table/bonificacions.interface';
import { BonificacionsAddModalComponent } from './../../../bonificacions/components/bonificacions-table/bonificacions-add-modal/bonificacions-add-modal.component';
import { LiquidacionsInterface } from './../../../liquidacions/components/liquidacions-table/liquidacions.interface';
import { LiquidacionsAddModalComponent } from './../../../liquidacions/components/liquidacions-table/liquidacions-add-modal/liquidacions-add-modal.component';
import { PagosInterface } from './../../../pagos/components/pagos-table/pagos.interface';
import { PagosAddModalComponent } from './../../../pagos/components/pagos-table/pagos-add-modal/pagos-add-modal.component';
import { PagofianzasInterface } from './../../../pagofianzas/components/pagofianzas-table/pagofianzas.interface';
import { PagofianzasAddModalComponent } from './../../../pagofianzas/components/pagofianzas-table/pagofianzas-add-modal/pagofianzas-add-modal.component';
import { PagoliquidacionsInterface } from './../../../pagoliquidacions/components/pagoliquidacions-table/pagoliquidacions.interface';
import { PagoliquidacionsAddModalComponent } from './../../../pagoliquidacions/components/pagoliquidacions-table/pagoliquidacions-add-modal/pagoliquidacions-add-modal.component';
import { PermisotaxiasignadosInterface } from './../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.interface';
import { PermisotaxiasignadosAddModalComponent } from './../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';

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
    backpage: boolean;

    constructor(
      private service: ChofersService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idestado'] !== undefined) {
          const idestado = +params['idestado'];
          this.findByIdEstado(idestado);
          this.backpage = true;
        }
        if (params['idpersona'] !== undefined) {
          const idpersona = +params['idpersona'];
          this.findByIdPersona(idpersona);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdEstado(id: number): void {
      this.service
        .findByIdEstado(id)
        .subscribe(
            (data: ChofersResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdPersona(id: number): void {
      this.service
        .findByIdPersona(id)
        .subscribe(
            (data: ChofersResponseInterface) => {
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
    insertBonificacion(chofers: ChofersInterface) {
      const bonificacion: BonificacionsInterface = {
        chofer_idchofer: chofers.idchofer
      }
      const disposable = this.dialogService.addDialog(BonificacionsAddModalComponent, bonificacion)
      .subscribe( data => {
          if (data) {
          this.bonificacionShowToast(data);
          }
      });
    }
    bonificacionShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewBonificacion(chofers: ChofersInterface) {
      this.router.navigate([`/pages/bonificacions/chofer/${chofers.idchofer}`]);
    }
    insertLiquidacion(chofers: ChofersInterface) {
      const liquidacion: LiquidacionsInterface = {
        chofer_idchofer: chofers.idchofer
      }
      const disposable = this.dialogService.addDialog(LiquidacionsAddModalComponent, liquidacion)
      .subscribe( data => {
          if (data) {
          this.liquidacionShowToast(data);
          }
      });
    }
    liquidacionShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewLiquidacion(chofers: ChofersInterface) {
      this.router.navigate([`/pages/liquidacions/chofer/${chofers.idchofer}`]);
    }
    insertPago(chofers: ChofersInterface) {
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
          this.pagoShowToast(data);
          }
      });
    }
    pagoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPago(chofers: ChofersInterface) {
      this.router.navigate([`/pages/pagos/chofer/${chofers.idchofer}`]);
    }
    insertPagofianza(chofers: ChofersInterface) {
      const pagofianza: PagofianzasInterface = {
        chofer_idchofer: chofers.idchofer
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
    viewPagofianza(chofers: ChofersInterface) {
      this.router.navigate([`/pages/pagofianzas/chofer/${chofers.idchofer}`]);
    }
    insertPagoliquidacion(chofers: ChofersInterface) {
      const pagoliquidacion: PagoliquidacionsInterface = {
        chofer_idchofer: chofers.idchofer
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
    viewPagoliquidacion(chofers: ChofersInterface) {
      this.router.navigate([`/pages/pagoliquidacions/chofer/${chofers.idchofer}`]);
    }
    insertPermisotaxiasignado(chofers: ChofersInterface) {
      const permisotaxiasignado: PermisotaxiasignadosInterface = {
        chofer_idchofer: chofers.idchofer
      }
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosAddModalComponent, permisotaxiasignado)
      .subscribe( data => {
          if (data) {
          this.permisotaxiasignadoShowToast(data);
          }
      });
    }
    permisotaxiasignadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPermisotaxiasignado(chofers: ChofersInterface) {
      this.router.navigate([`/pages/permisotaxiasignados/chofer/${chofers.idchofer}`]);
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

    verBitacora(chofers: ChofersInterface) {
      this.router.navigate([`/pages/reportes/bitacora-pagos-chofer/${chofers.idchofer}`]);
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
