import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EstadosInterface } from './estados.interface';
import { EstadosResponseInterface } from './estados-response.interface';
import { Component, OnInit } from '@angular/core';
import { EstadosService } from './estados.service';
import { EstadosAddModalComponent } from './estados-add-modal/estados-add-modal.component';
import { EstadosEditModalComponent } from './estados-edit-modal/estados-edit-modal.component';
import { BonificacionsInterface } from './../../../bonificacions/components/bonificacions-table/bonificacions.interface';
import { BonificacionsAddModalComponent } from './../../../bonificacions/components/bonificacions-table/bonificacions-add-modal/bonificacions-add-modal.component';
import { ChofersInterface } from './../../../chofers/components/chofers-table/chofers.interface';
import { ChofersAddModalComponent } from './../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
import { CorralonsInterface } from './../../../corralons/components/corralons-table/corralons.interface';
import { CorralonsAddModalComponent } from './../../../corralons/components/corralons-table/corralons-add-modal/corralons-add-modal.component';
import { LiquidacionsInterface } from './../../../liquidacions/components/liquidacions-table/liquidacions.interface';
import { LiquidacionsAddModalComponent } from './../../../liquidacions/components/liquidacions-table/liquidacions-add-modal/liquidacions-add-modal.component';
import { OrdensInterface } from './../../../ordens/components/ordens-table/ordens.interface';
import { OrdensAddModalComponent } from './../../../ordens/components/ordens-table/ordens-add-modal/ordens-add-modal.component';
import { PagosInterface } from './../../../pagos/components/pagos-table/pagos.interface';
import { PagosAddModalComponent } from './../../../pagos/components/pagos-table/pagos-add-modal/pagos-add-modal.component';
import { PermisotaxisInterface } from './../../../permisotaxis/components/permisotaxis-table/permisotaxis.interface';
import { PermisotaxisAddModalComponent } from './../../../permisotaxis/components/permisotaxis-table/permisotaxis-add-modal/permisotaxis-add-modal.component';
import { PermisotaxiasignadosInterface } from './../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.interface';
import { PermisotaxiasignadosAddModalComponent } from './../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
import { VehiculosInterface } from './../../../vehiculos/components/vehiculos-table/vehiculos.interface';
import { VehiculosAddModalComponent } from './../../../vehiculos/components/vehiculos-table/vehiculos-add-modal/vehiculos-add-modal.component';
import { VehiculoreparandosInterface } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.interface';
import { VehiculoreparandosAddModalComponent } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';

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
    backpage: boolean;

    constructor(
      private service: EstadosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertBonificacion(estados: EstadosInterface) {
      const bonificacion: BonificacionsInterface = {
        estado_idestado: estados.idestado
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
    viewBonificacion(estados: EstadosInterface) {
      this.router.navigate([`/pages/bonificacions/estado/${estados.idestado}`]);
    }
    insertChofer(estados: EstadosInterface) {
      const chofer: ChofersInterface = {
        estado_idestado: estados.idestado
      }
      const disposable = this.dialogService.addDialog(ChofersAddModalComponent, chofer)
      .subscribe( data => {
          if (data) {
          this.choferShowToast(data);
          }
      });
    }
    choferShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewChofer(estados: EstadosInterface) {
      this.router.navigate([`/pages/chofers/estado/${estados.idestado}`]);
    }
    insertCorralon(estados: EstadosInterface) {
      const corralon: CorralonsInterface = {
        estado_idestado: estados.idestado
      }
      const disposable = this.dialogService.addDialog(CorralonsAddModalComponent, corralon)
      .subscribe( data => {
          if (data) {
          this.corralonShowToast(data);
          }
      });
    }
    corralonShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewCorralon(estados: EstadosInterface) {
      this.router.navigate([`/pages/corralons/estado/${estados.idestado}`]);
    }
    insertLiquidacion(estados: EstadosInterface) {
      const liquidacion: LiquidacionsInterface = {
        estado_idestado: estados.idestado
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
    viewLiquidacion(estados: EstadosInterface) {
      this.router.navigate([`/pages/liquidacions/estado/${estados.idestado}`]);
    }
    insertOrden(estados: EstadosInterface) {
      const orden: OrdensInterface = {
        estado_idestado: estados.idestado
      }
      const disposable = this.dialogService.addDialog(OrdensAddModalComponent, orden)
      .subscribe( data => {
          if (data) {
          this.ordenShowToast(data);
          }
      });
    }
    ordenShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrden(estados: EstadosInterface) {
      this.router.navigate([`/pages/ordens/estado/${estados.idestado}`]);
    }
    insertPago(estados: EstadosInterface) {
      const pago: PagosInterface = {
        estado_idestado: estados.idestado
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
    viewPago(estados: EstadosInterface) {
      this.router.navigate([`/pages/pagos/estado/${estados.idestado}`]);
    }
    insertPermisotaxi(estados: EstadosInterface) {
      const permisotaxi: PermisotaxisInterface = {
        estado_idestado: estados.idestado
      }
      const disposable = this.dialogService.addDialog(PermisotaxisAddModalComponent, permisotaxi)
      .subscribe( data => {
          if (data) {
          this.permisotaxiShowToast(data);
          }
      });
    }
    permisotaxiShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPermisotaxi(estados: EstadosInterface) {
      this.router.navigate([`/pages/permisotaxis/estado/${estados.idestado}`]);
    }
    insertPermisotaxiasignado(estados: EstadosInterface) {
      const permisotaxiasignado: PermisotaxiasignadosInterface = {
        estado_idestado: estados.idestado
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
    viewPermisotaxiasignado(estados: EstadosInterface) {
      this.router.navigate([`/pages/permisotaxiasignados/estado/${estados.idestado}`]);
    }
    insertVehiculo(estados: EstadosInterface) {
      const vehiculo: VehiculosInterface = {
        estado_idestado: estados.idestado
      }
      const disposable = this.dialogService.addDialog(VehiculosAddModalComponent, vehiculo)
      .subscribe( data => {
          if (data) {
          this.vehiculoShowToast(data);
          }
      });
    }
    vehiculoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewVehiculo(estados: EstadosInterface) {
      this.router.navigate([`/pages/vehiculos/estado/${estados.idestado}`]);
    }
    insertVehiculoreparando(estados: EstadosInterface) {
      const vehiculoreparando: VehiculoreparandosInterface = {
        estado_idestado: estados.idestado
      }
      const disposable = this.dialogService.addDialog(VehiculoreparandosAddModalComponent, vehiculoreparando)
      .subscribe( data => {
          if (data) {
          this.vehiculoreparandoShowToast(data);
          }
      });
    }
    vehiculoreparandoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewVehiculoreparando(estados: EstadosInterface) {
      this.router.navigate([`/pages/vehiculoreparandos/estado/${estados.idestado}`]);
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
