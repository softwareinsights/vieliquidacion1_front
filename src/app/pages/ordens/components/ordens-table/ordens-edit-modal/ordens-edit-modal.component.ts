import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdensService } from './../ordens.service';
import { OrdensInterface } from './../ordens.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { VehiculoreparandosService } from './../../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.service';
import { VehiculoreparandosAddModalComponent } from './../../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./ordens-edit-modal.component.scss')],
  templateUrl: './ordens-edit-modal.component.html'
})
export class OrdensEditModalComponent extends DialogComponent<OrdensInterface, any> implements OnInit, OrdensInterface {
  _estado: string[] = [];
  _vehiculoreparando: string[] = [];

  idorden: number;
  fecha: string;
  hora: string;
  manoObra: number;
  subtotal: number;
  total: number;
  anticipo: number;
  estado_idestado: number;
  descripcion: string;
  vehiculoreparando_idvehiculoreparando: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  manoObraAC: AbstractControl;
  subtotalAC: AbstractControl;
  totalAC: AbstractControl;
  anticipoAC: AbstractControl;
  estado_idestadoAC: AbstractControl;
  descripcionAC: AbstractControl;
  vehiculoreparando_idvehiculoreparandoAC: AbstractControl;
  constructor(
      private service: OrdensService,
      private estadosService: EstadosService,
      private vehiculoreparandosService: VehiculoreparandosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'fechaAC' : [''],
    'horaAC' : [''],
    'manoObraAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'subtotalAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'totalAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'anticipoAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(200)])],
    'vehiculoreparando_idvehiculoreparandoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.fechaAC = this.form.controls['fechaAC'];
  this.horaAC = this.form.controls['horaAC'];
  this.manoObraAC = this.form.controls['manoObraAC'];
  this.subtotalAC = this.form.controls['subtotalAC'];
  this.totalAC = this.form.controls['totalAC'];
  this.anticipoAC = this.form.controls['anticipoAC'];
  this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
  this.descripcionAC = this.form.controls['descripcionAC'];
  this.vehiculoreparando_idvehiculoreparandoAC = this.form.controls['vehiculoreparando_idvehiculoreparandoAC'];
  }
  ngOnInit() {
      this.getEstado();
      this.getVehiculoreparando();
  }

  estadoAddModalShow() {
      const disposable = this.dialogService.addDialog(EstadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.estadoShowToast(data);
          }
      })
  }

  estadoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getEstado();
      } else {
          this.toastrService.error(result.message);
      }
  }
  vehiculoreparandoAddModalShow() {
      const disposable = this.dialogService.addDialog(VehiculoreparandosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.vehiculoreparandoShowToast(data);
          }
      })
  }

  vehiculoreparandoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getVehiculoreparando();
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
  getVehiculoreparando() {
      this.vehiculoreparandosService.all()
      .subscribe(
          (data: any) => this._vehiculoreparando = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: OrdensInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idorden: this.idorden,
                  fecha: this.fecha,
                  hora: this.hora,
                  manoObra: this.manoObra,
                  subtotal: this.subtotal,
                  total: this.total,
                  anticipo: this.anticipo,
                  estado_idestado: this.estado_idestado,
                  descripcion: this.descripcion,
                  vehiculoreparando_idvehiculoreparando: this.vehiculoreparando_idvehiculoreparando,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
