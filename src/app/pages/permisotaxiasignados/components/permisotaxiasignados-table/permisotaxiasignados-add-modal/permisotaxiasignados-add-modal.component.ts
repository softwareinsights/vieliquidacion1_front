import { LiquidacionsService } from './../../../../liquidacions/components/liquidacions-table/liquidacions.service';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxiasignadosService } from './../permisotaxiasignados.service';
import { PermisotaxiasignadosInterface } from './../permisotaxiasignados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
import { PermisotaxisService } from './../../../../permisotaxis/components/permisotaxis-table/permisotaxis.service';
import { PermisotaxisAddModalComponent } from './../../../../permisotaxis/components/permisotaxis-table/permisotaxis-add-modal/permisotaxis-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./permisotaxiasignados-add-modal.component.scss')],
  templateUrl: './permisotaxiasignados-add-modal.component.html'
})
export class PermisotaxiasignadosAddModalComponent extends DialogComponent<PermisotaxiasignadosInterface, any> implements OnInit, PermisotaxiasignadosInterface {
  _estado: string[] = [];
  _chofer: string[] = [];
  _permisotaxi: string[] = [];

  fecha: string;
  hora: string;
  chofer_idchofer: number;
  permisotaxi_idpermisotaxi: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  permisotaxi_idpermisotaxiAC: AbstractControl;

  constructor(
    private service: PermisotaxiasignadosService,
    private estadosService: EstadosService,
    private chofersService: ChofersService,
    private permisotaxisService: PermisotaxisService,
    private liquidacionsService: LiquidacionsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'fechaAC' : [''],
    'horaAC' : [''],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'permisotaxi_idpermisotaxiAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
    this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
    this.permisotaxi_idpermisotaxiAC = this.form.controls['permisotaxi_idpermisotaxiAC'];
  }
  ngOnInit() {
      this.getEstado();
      this.getChofer();
      this.getPermisotaxi();
  }
  estadoAddModalShow() {
      const disposable = this.dialogService.addDialog(EstadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.estadoShowToast(data);
          }
      });
  }
  estadoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getEstado();
      } else {
          this.toastrService.error(result.message);
      }
  }
  choferAddModalShow() {
      const disposable = this.dialogService.addDialog(ChofersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.choferShowToast(data);
          }
      });
  }
  choferShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getChofer();
      } else {
          this.toastrService.error(result.message);
      }
  }
  permisotaxiAddModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxisAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.permisotaxiShowToast(data);
          }
      });
  }
  permisotaxiShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPermisotaxi();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getEstado() {
      this.estadosService.all()
      .subscribe(
          (data: any) => this._estado = data.result,
      );
  }
  getChofer() {
      this.chofersService.allDisponibles()
      .subscribe(
          (data: any) => this._chofer = data.result,
      );
  }
  getPermisotaxi() {
      this.permisotaxisService.allDisponibles()
      .subscribe(
          (data: any) => this._permisotaxi = data.result,
      );
  }


  // AGREGA LIQUIDACIÓN DESPUÉS DE CREAR PERMISOTAXIASIGNADO
  postLiquidacion(data) {
      this.liquidacionsService.insert(data)
      .subscribe(
          (result: any) => {
              this.data = result;
              this.confirm();
          });
  }

   // UPDATE LIQUIDACIÓN ACTUAL DESPUÉS DE CREAR PERMISOTAXIASIGNADO
  updateLiquidacion(data, nuevaLiquidacion) {
      this.liquidacionsService.update(data)
      .subscribe(
          (result: any) => {

              // CREAR NUEVA LIQUIDACIÓN EN ESTE DÍA A CHOFER CON MONTO A PARTIR DE HORA ACTUAL
              this.postLiquidacion(nuevaLiquidacion);

              this.data = result;
              this.confirm();
          });
  }

  liquidacionFromIdchoferFecha(data, nuevaLiquidacion) {
      // OBTENER EL REGISTRO DE LIQUIDACION DEL DIA ACTUAL ADEUDANDO DE CHOFER


      this.liquidacionsService.liquidacionFromIdchoferFecha(data)
      .subscribe(
          (result: any) => {

               // CERRAR MONTO ADEUDANDO CON LA HORA ACTUAL
                this.updateLiquidacion({
                    fecha: data.fecha,
                    saldoactual: data.saldoactual,
                    h_corte: this.hora,
                    idliquidacion: result.idliquidacion,
                }, nuevaLiquidacion);

          });
  }




  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PermisotaxiasignadosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  estado_idestado: 12,
                  fecha: this.fecha,
                  hora: this.hora,
                  chofer_idchofer: this.chofer_idchofer,
                  permisotaxi_idpermisotaxi: this.permisotaxi_idpermisotaxi,
        })
        .subscribe(
            (data: any) => {
              if (data.success) {
                this.permisotaxisService.findLiquidacionByIdInThisDayAtThisHour(this.permisotaxi_idpermisotaxi)
                    .subscribe(
                        (_data: any) => {
                        if (_data.success) {
                            

                            // CERRAR MONTO A PAGAR CON HORA ACTUAL A LIQUIDACIÓN ACTUAL A CHOFER
                            // ENVÍA LOS DATOS DENTRO DE PARAMETRO DE NUEVALIQUIDACION PARA POSTERIOR 
                            // A UPDATE CREA REGISTRO DE LIQUIDACIÓN
                            this.liquidacionFromIdchoferFecha({
                                fecha: this.fecha,
                                chofer_idchofer: this.chofer_idchofer,
                                saldoactual: _data.result.liquidezDown,
                                }, 
                                {
                                    fecha: this.fecha,
                                    saldoanterior: _data.result.liquidezUp,
                                    saldoactual: _data.result.liquidezUp,
                                    montopagado: 0,
                                    bonificado: 0,
                                    h_corte: '00:00:00',
                                    permisotaxiasignado_idpermisotaxiasignado: data.result.insertId,
                                    chofer_idchofer: this.chofer_idchofer,
                                    estado_idestado: 9, // ADEUDANDO
                                });




                        }
                    });

              } else {
                  this.data = data;
                  this.confirm();
              }
            });
    }
  }
}
