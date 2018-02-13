import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EnviotallersService } from './../enviotallers.service';
import { EnviotallersInterface } from './../enviotallers.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MantenimientosService } from './../../../../mantenimientos/components/mantenimientos-table/mantenimientos.service';
import { MantenimientosAddModalComponent } from './../../../../mantenimientos/components/mantenimientos-table/mantenimientos-add-modal/mantenimientos-add-modal.component';
import { PermisotaxiasignadosService } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';
import { PermisotaxiasignadosAddModalComponent } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
import { TallersService } from './../../../../tallers/components/tallers-table/tallers.service';
import { TallersAddModalComponent } from './../../../../tallers/components/tallers-table/tallers-add-modal/tallers-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./enviotallers-edit-modal.component.scss')],
  templateUrl: './enviotallers-edit-modal.component.html'
})
export class EnviotallersEditModalComponent extends DialogComponent<EnviotallersInterface, any> implements OnInit, EnviotallersInterface {
  _mantenimiento: string[] = [];
  _permisotaxiasignado: string[] = [];
  _taller: string[] = [];

  idenviotaller: number;
  fecha: string;
  mantenimiento_idmantenimiento: string;
  hora: string;
  motivo: string;
  permisotaxiasignado_idpermisotaxiasignado: number;
  taller_idtaller: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  fechaAC: AbstractControl;
  mantenimiento_idmantenimientoAC: AbstractControl;
  horaAC: AbstractControl;
  motivoAC: AbstractControl;
  permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;
  taller_idtallerAC: AbstractControl;
  constructor(
      private service: EnviotallersService,
      private mantenimientosService: MantenimientosService,
      private permisotaxiasignadosService: PermisotaxiasignadosService,
      private tallersService: TallersService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'fechaAC' : [''],
    'mantenimiento_idmantenimientoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(25)])],
    'horaAC' : [''],
    'motivoAC' : ['',Validators.compose([Validators.maxLength(80)])],
    'permisotaxiasignado_idpermisotaxiasignadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'taller_idtallerAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.fechaAC = this.form.controls['fechaAC'];
  this.mantenimiento_idmantenimientoAC = this.form.controls['mantenimiento_idmantenimientoAC'];
  this.horaAC = this.form.controls['horaAC'];
  this.motivoAC = this.form.controls['motivoAC'];
  this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];
  this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
  }
  ngOnInit() {
      this.getMantenimiento();
      this.getPermisotaxiasignado();
      this.getTaller();
  }

  mantenimientoAddModalShow() {
      const disposable = this.dialogService.addDialog(MantenimientosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.mantenimientoShowToast(data);
          }
      })
  }

  mantenimientoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getMantenimiento();
      } else {
          this.toastrService.error(result.message);
      }
  }
  permisotaxiasignadoAddModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.permisotaxiasignadoShowToast(data);
          }
      })
  }

  permisotaxiasignadoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPermisotaxiasignado();
      } else {
          this.toastrService.error(result.message);
      }
  }
  tallerAddModalShow() {
      const disposable = this.dialogService.addDialog(TallersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.tallerShowToast(data);
          }
      })
  }

  tallerShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getTaller();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getMantenimiento() {
      this.mantenimientosService.all()
      .subscribe(
          (data: any) => this._mantenimiento = data.result,
      );
  }
  getPermisotaxiasignado() {
      this.permisotaxiasignadosService.all()
      .subscribe(
          (data: any) => this._permisotaxiasignado = data.result,
      );
  }
  getTaller() {
      this.tallersService.all()
      .subscribe(
          (data: any) => this._taller = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: EnviotallersInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idenviotaller: this.idenviotaller,
                  fecha: this.fecha,
                  mantenimiento_idmantenimiento: this.mantenimiento_idmantenimiento,
                  hora: this.hora,
                  motivo: this.motivo,
                  permisotaxiasignado_idpermisotaxiasignado: this.permisotaxiasignado_idpermisotaxiasignado,
                  taller_idtaller: this.taller_idtaller,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
