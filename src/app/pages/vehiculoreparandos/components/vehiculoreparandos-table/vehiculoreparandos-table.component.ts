import { ChofersInterface } from './../../../chofers/components/chofers-table/chofers.interface';
import { ChofersService } from './../../../chofers/components/chofers-table/chofers.service';
import { VehiculosService } from './../../../vehiculos/components/vehiculos-table/vehiculos.service';
import { VehiculosInterface } from './../../../vehiculos/components/vehiculos-table/vehiculos.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { VehiculoreparandosInterface } from './vehiculoreparandos.interface';
import { VehiculoreparandosResponseInterface } from './vehiculoreparandos-response.interface';
import { Component, OnInit } from '@angular/core';
import { VehiculoreparandosService } from './vehiculoreparandos.service';
import { VehiculoreparandosAddModalComponent } from './vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';
import { VehiculoreparandosEditModalComponent } from './vehiculoreparandos-edit-modal/vehiculoreparandos-edit-modal.component';
import { OrdensInterface } from './../../../ordens/components/ordens-table/ordens.interface';
import { OrdensAddModalComponent } from './../../../ordens/components/ordens-table/ordens-add-modal/ordens-add-modal.component';

@Component({
selector: 'vehiculoreparandos-table',
templateUrl: './vehiculoreparandos-table.html',
styleUrls: ['./vehiculoreparandos-table.scss'],
})
export class VehiculoreparandosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idvehiculoreparando';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: VehiculoreparandosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private vehiculosService: VehiculosService,
      private chofersService: ChofersService,
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idenviotaller'] !== undefined) {
          const idenviotaller = +params['idenviotaller'];
          this.findByIdEnviotaller(idenviotaller);
          this.backpage = true;
        }
        if (params['idestado'] !== undefined) {
          const idestado = +params['idestado'];
          this.findByIdEstado(idestado);
          this.backpage = true;
        }
        if (params['idmecanico'] !== undefined) {
          const idmecanico = +params['idmecanico'];
          this.findByIdMecanico(idmecanico);
          this.backpage = true;
        }
        if (params['idpermisotaxiasignado'] !== undefined) {
          const idpermisotaxiasignado = +params['idpermisotaxiasignado'];
          this.findByIdPermisotaxiasignado(idpermisotaxiasignado);
          this.backpage = true;
        }
        if (params['idtaller'] !== undefined) {
          const idtaller = +params['idtaller'];
          this.findByIdTaller(idtaller);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }



    goOutVehicle(vehiculoreparandos: VehiculoreparandosInterface) {
      this.service.goOutVehicle(vehiculoreparandos)
      .subscribe(
          (data) => {
            console.log('service.goOutVehicle data', data);
            if (data.success) {
              this.showToast(data);


              console.log('vehiculoreparandos', vehiculoreparandos);
              if (vehiculoreparandos.enviotaller_idenviotaller) {
                // Update a vehiculo
                const vehiculo: VehiculosInterface = {
                  idvehiculo: data.result.idvehiculo,
                  estado_idestado: 19 // DISPONIBLE
                }
                this.vehiculosService
                .update(vehiculo)
                .subscribe(
                    (data: any) => {
                      this.showToast(data);
                });

                // Update a chofer
                const chofer: ChofersInterface = {
                  idchofer: data.result.idchofer,
                  estado_idestado: 5 // ACTIVO
                }
                this.chofersService
                .update(chofer)
                .subscribe(
                    (data: any) => {
                      this.showToast(data);
                });
              }
            }
          });
    }


    private findByIdEnviotaller(id: number): void {
      this.service
        .findByIdEnviotaller(id)
        .subscribe(
            (data: VehiculoreparandosResponseInterface) => {
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
            (data: VehiculoreparandosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdMecanico(id: number): void {
      this.service
        .findByIdMecanico(id)
        .subscribe(
            (data: VehiculoreparandosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdPermisotaxiasignado(id: number): void {
      this.service
        .findByIdPermisotaxiasignado(id)
        .subscribe(
            (data: VehiculoreparandosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdTaller(id: number): void {
      this.service
        .findByIdTaller(id)
        .subscribe(
            (data: VehiculoreparandosResponseInterface) => {
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
    insertOrden(vehiculoreparandos: VehiculoreparandosInterface) {
      const orden: OrdensInterface = {
        vehiculoreparando_idvehiculoreparando: vehiculoreparandos.idvehiculoreparando
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
    viewOrden(vehiculoreparandos: VehiculoreparandosInterface) {
      this.router.navigate([`/pages/ordens/vehiculoreparando/${vehiculoreparandos.idvehiculoreparando}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(VehiculoreparandosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(vehiculoreparandos: VehiculoreparandosInterface) {
      const disposable = this.dialogService.addDialog(VehiculoreparandosEditModalComponent, vehiculoreparandos)
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
          this.service.remove(item.idvehiculoreparando)
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
            (data: VehiculoreparandosResponseInterface) =>  {
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
