import { CorralonsAddModalComponent } from './../../../corralons/components/corralons-table/corralons-add-modal/corralons-add-modal.component';
import { CorralonsInterface } from './../../../corralons/components/corralons-table/corralons.interface';
import { ChofersService } from './../../../chofers/components/chofers-table/chofers.service';
import { ChofersInterface } from './../../../chofers/components/chofers-table/chofers.interface';
import { VehiculosService } from './../../../vehiculos/components/vehiculos-table/vehiculos.service';
import { VehiculosInterface } from './../../../vehiculos/components/vehiculos-table/vehiculos.interface';
import { Persona_choferFilterPipe } from './../../../../theme/pipes/shared/persona_chofer-filter.pipe';
import { EnviotallersAddModalComponent } from './../../../enviotallers/components/enviotallers-table/enviotallers-add-modal/enviotallers-add-modal.component';
import { EnviotallersInterface } from './../../../enviotallers/components/enviotallers-table/enviotallers.interface';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxiasignadosInterface } from './permisotaxiasignados.interface';
import { PermisotaxiasignadosResponseInterface } from './permisotaxiasignados-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxiasignadosService } from './permisotaxiasignados.service';
import { PermisotaxiasignadosAddModalComponent } from './permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
import { PermisotaxiasignadosEditModalComponent } from './permisotaxiasignados-edit-modal/permisotaxiasignados-edit-modal.component';
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
    constructor(
      private service: PermisotaxiasignadosService,
      private vehiculosService: VehiculosService, 
      private chofersService: ChofersService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }

    addCorralonModalShow(permisotaxiasignados: PermisotaxiasignadosInterface) {

      // Envio a taller
      const corralon: CorralonsInterface = {
        fecha: '',
        hora: '',
        fechaSalida: '',
        horaSalida: '',
        infraccionNumero: 0,
        corralonNombre: '',
        motivo: '',
        estado_idestado: 5, // ACTIVO
        permisotaxiasignado_idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado,
      }

      const disposable = this.dialogService.addDialog(CorralonsAddModalComponent, corralon)
      .subscribe( data => {
          if (data) {
            if (data.success) {

              // Update a estado de permisotaxiasignado
              const permisotaxiasignado: PermisotaxiasignadosInterface = {
                idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado,
                estado_idestado: 17 // ASIGNADO-CORRALÓN
              }

              this.service
              .update(permisotaxiasignado)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              // Update a vehiculo
              const vehiculo: VehiculosInterface = {
                idvehiculo: permisotaxiasignados.vehiculo_idvehiculo,
                estado_idestado: 18 // CORRALON
              }
              this.vehiculosService
              .update(vehiculo)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              // Update a chofer
              const chofer: ChofersInterface = {
                idchofer: permisotaxiasignados.chofer_idchofer,
                estado_idestado: 10 // INACTIVO
              }
              this.chofersService
              .update(chofer)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

            }
            this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }

    addEnviotallerModalShow(permisotaxiasignados: PermisotaxiasignadosInterface) {

      // Envio a taller
      const enviotaller: EnviotallersInterface = {
        fecha: '',
        hora: '',
        motivo: '',
        permisotaxiasignado_idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado,
        taller_idtaller: 0
      }

      const disposable = this.dialogService.addDialog(EnviotallersAddModalComponent, enviotaller)
      .subscribe( data => {
          if (data) {
            if (data.success) {

              // Update a estado de permisotaxiasignado
              const permisotaxiasignado: PermisotaxiasignadosInterface = {
                idpermisotaxiasignado: permisotaxiasignados.idpermisotaxiasignado,
                estado_idestado: 14 // ASIGNADO-REPARANDO
              }

              this.service
              .update(permisotaxiasignado)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              // Update a vehiculo
              const vehiculo: VehiculosInterface = {
                idvehiculo: permisotaxiasignados.vehiculo_idvehiculo,
                estado_idestado: 15 // TALLER
              }
              this.vehiculosService
              .update(vehiculo)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

              // Update a chofer
              const chofer: ChofersInterface = {
                idchofer: permisotaxiasignados.chofer_idchofer,
                estado_idestado: 10 // INACTIVO
              }
              this.chofersService
              .update(chofer)
              .subscribe(
                  (data: any) => {
                    this.showToast(data);
              });

            }
            this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
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
