import { PermisotaxisInterface } from './../../../permisotaxis/components/permisotaxis-table/permisotaxis.interface';
import { PermisotaxisService } from './../../../permisotaxis/components/permisotaxis-table/permisotaxis.service';
import { ChofersService } from './../../../chofers/components/chofers-table/chofers.service';
import { ChofersInterface } from './../../../chofers/components/chofers-table/chofers.interface';
import { VehiculosService } from './../../../vehiculos/components/vehiculos-table/vehiculos.service';
import { VehiculosInterface } from './../../../vehiculos/components/vehiculos-table/vehiculos.interface';
import { Persona_choferFilterPipe } from './../../../../theme/pipes/shared/persona_chofer-filter.pipe';

import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxiasignadosInterface } from './permisotaxiasignados.interface';
import { PermisotaxiasignadosResponseInterface } from './permisotaxiasignados-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxiasignadosService } from './permisotaxiasignados.service';
import { PermisotaxiasignadosAddModalComponent } from './permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
import { PermisotaxiasignadosEditModalComponent } from './permisotaxiasignados-edit-modal/permisotaxiasignados-edit-modal.component';
import { CorralonsInterface } from './../../../corralons/components/corralons-table/corralons.interface';
import { CorralonsAddModalComponent } from './../../../corralons/components/corralons-table/corralons-add-modal/corralons-add-modal.component';
import { EnviotallersInterface } from './../../../enviotallers/components/enviotallers-table/enviotallers.interface';
import { EnviotallersAddModalComponent } from './../../../enviotallers/components/enviotallers-table/enviotallers-add-modal/enviotallers-add-modal.component';
import { LiquidacionsInterface } from './../../../liquidacions/components/liquidacions-table/liquidacions.interface';
import { LiquidacionsAddModalComponent } from './../../../liquidacions/components/liquidacions-table/liquidacions-add-modal/liquidacions-add-modal.component';
import { VehiculoreparandosInterface } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.interface';
import { VehiculoreparandosAddModalComponent } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';


@Component({
selector: 'permisotaxiasignados-table',
templateUrl: './permisotaxiasignados-table.html',
styleUrls: ['./permisotaxiasignados-table.scss'],
})
export class PermisotaxiasignadosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisotaxiasignado';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: PermisotaxiasignadosService, 
      private permisotaxisService: PermisotaxisService, 
      private chofersService: ChofersService, 
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
        if (params['idpermisotaxi'] !== undefined) {
          const idpermisotaxi = +params['idpermisotaxi'];
          this.findByIdPermisotaxi(idpermisotaxi);
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
            (data: PermisotaxiasignadosResponseInterface) => {
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
            (data: PermisotaxiasignadosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdPermisotaxi(id: number): void {
      this.service
        .findByIdPermisotaxi(id)
        .subscribe(
            (data: PermisotaxiasignadosResponseInterface) => {
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

    unassignChofer(permisotaxiasignados: PermisotaxiasignadosInterface) {
        // Update a estado de permisotaxiasignado
        const permisotaxiasignado: PermisotaxiasignadosInterface = {
          idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado,
          estado_idestado: 23 // SEBAJAACHOFER
        }

        this.service
        .update(permisotaxiasignado)
        .subscribe(
            (data: any) => {
              this.showToast(data);
        });

        // Update a permisotaxi
        const permisotaxi: PermisotaxisInterface = {
          idpermisotaxi: permisotaxiasignados.permisotaxi_idpermisotaxi,
          estado_idestado: 19 // DISPONIBLE
        }
        this.permisotaxisService
        .update(permisotaxi)
        .subscribe(
            (data: any) => {
              this.showToast(data);
        });

        // Update a chofer
        const chofer: ChofersInterface = {
          idchofer: permisotaxiasignados.chofer_idchofer,
          estado_idestado: 19 // DISPONIBLE
        }
        this.chofersService
        .update(chofer)
        .subscribe(
            (data: any) => {
              this.showToast(data);
        });
    }

    insertCorralon(permisotaxiasignados: PermisotaxiasignadosInterface) {
      const corralon: CorralonsInterface = {
        permisotaxiasignado_idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado
      }
      const disposable = this.dialogService.addDialog(CorralonsAddModalComponent, corralon)
      .subscribe( data => {
          if (data) {
            if (data.success) {


              // Update a estado de permisotaxiasignado
              const permisotaxiasignado: PermisotaxiasignadosInterface = {
                idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado,
                estado_idestado: 23 // SEBAJAACHOFER
              }

              this.service
              .update(permisotaxiasignado)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              // Update a estado de permisotaxi
              const permisotaxi: PermisotaxisInterface = {
                idpermisotaxi: permisotaxiasignados.permisotaxi_idpermisotaxi,
                estado_idestado: 18 // CORRALON
              }

              this.service
              .update(permisotaxiasignado)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              // Update a chofer
              const chofer: ChofersInterface = {
                idchofer: permisotaxiasignados.chofer_idchofer,
                estado_idestado: 19 // DISPONIBLE
              }
              this.chofersService
              .update(chofer)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

            }
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
    viewCorralon(permisotaxiasignados: PermisotaxiasignadosInterface) {
      this.router.navigate([`/pages/corralons/permisotaxiasignado/${permisotaxiasignados.idpermisotaxiasignado}`]);
    }
    insertEnviotaller(permisotaxiasignados: PermisotaxiasignadosInterface) {
      const enviotaller: EnviotallersInterface = {
        permisotaxiasignado_idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado
      }
      const disposable = this.dialogService.addDialog(EnviotallersAddModalComponent, enviotaller)
      .subscribe( data => {
          if (data) {
            if (data.success) {

              // Update a estado de permisotaxiasignado
              const permisotaxiasignado: PermisotaxiasignadosInterface = {
                idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado,
                estado_idestado: 23 // SEBAJAACHOFER
              }

              this.service
              .update(permisotaxiasignado)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              
              // Update a estado de permisotaxi
              const permisotaxi: PermisotaxisInterface = {
                idpermisotaxi: permisotaxiasignados.permisotaxi_idpermisotaxi,
                estado_idestado: 15 // TALLER
              }

              this.service
              .update(permisotaxiasignado)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              // Update a chofer
              const chofer: ChofersInterface = {
                idchofer: permisotaxiasignados.chofer_idchofer,
                estado_idestado: 19 // DISPONIBLE
              }
              this.chofersService
              .update(chofer)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

            }
          this.enviotallerShowToast(data);
          }
      });
    }






    insertEnviotallerMantenimiento(permisotaxiasignados: PermisotaxiasignadosInterface) {
      const enviotaller: EnviotallersInterface = {
        permisotaxiasignado_idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado,
        motivo: 'Mantenimiento'
      }
      const disposable = this.dialogService.addDialog(EnviotallersAddModalComponent, enviotaller)
      .subscribe( data => {
          if (data) {
            if (data.success) {

              // Update a estado de permisotaxiasignado
              const permisotaxiasignado: PermisotaxiasignadosInterface = {
                idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado,
                estado_idestado: 23 // SEBAJAACHOFER
              }

              this.service
              .update(permisotaxiasignado)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              // Update a estado de permisotaxi
              const permisotaxi: PermisotaxisInterface = {
                idpermisotaxi: permisotaxiasignados.permisotaxi_idpermisotaxi,
                estado_idestado: 15 // TALLER
              }

              this.service
              .update(permisotaxiasignado)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              // Update a chofer
              const chofer: ChofersInterface = {
                idchofer: permisotaxiasignados.chofer_idchofer,
                estado_idestado: 19 // DISPONIBLE
              }
              this.chofersService
              .update(chofer)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

            }
          this.enviotallerShowToast(data);
          }
      });
    }




    enviotallerShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewEnviotaller(permisotaxiasignados: PermisotaxiasignadosInterface) {
      this.router.navigate([`/pages/enviotallers/permisotaxiasignado/${permisotaxiasignados.idpermisotaxiasignado}`]);
    }
    insertLiquidacion(permisotaxiasignados: PermisotaxiasignadosInterface) {
      const liquidacion: LiquidacionsInterface = {
        permisotaxiasignado_idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado
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
    viewLiquidacion(permisotaxiasignados: PermisotaxiasignadosInterface) {
      this.router.navigate([`/pages/liquidacions/permisotaxiasignado/${permisotaxiasignados.idpermisotaxiasignado}`]);
    }
    insertVehiculoreparando(permisotaxiasignados: PermisotaxiasignadosInterface) {
      const vehiculoreparando: VehiculoreparandosInterface = {
        permisotaxiasignado_idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado
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
    viewVehiculoreparando(permisotaxiasignados: PermisotaxiasignadosInterface) {
      this.router.navigate([`/pages/vehiculoreparandos/permisotaxiasignado/${permisotaxiasignados.idpermisotaxiasignado}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(permisotaxiasignados: PermisotaxiasignadosInterface) {
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosEditModalComponent, permisotaxiasignados)
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
          this.service.remove(item.idpermisotaxiasignado)
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
            (data: PermisotaxiasignadosResponseInterface) =>  {
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
