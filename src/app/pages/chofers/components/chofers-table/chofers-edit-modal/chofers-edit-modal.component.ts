import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ChofersService } from './../chofers.service';
import { ChofersInterface } from './../chofers.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PersonasAddModalComponent } from './../../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./chofers-edit-modal.component.scss')],
  templateUrl: './chofers-edit-modal.component.html'
})
export class ChofersEditModalComponent extends DialogComponent<ChofersInterface, any> implements OnInit, ChofersInterface {
  _estado: string[] = [];
  _persona: string[] = [];

  idchofer: number;
  licencia: string;
  fianza: number;
  estado_idestado: number;
  estado_idestado_fianza: number;
  chofer: number;
  aval1: number;
  aval2: number;
  aval3: number;
  aval4: number;
  deudafianza: number;
  deudaliquidacion: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  licenciaAC: AbstractControl;
  fianzaAC: AbstractControl;
  estado_idestadoAC: AbstractControl;
  estado_idestado_fianzaAC: AbstractControl;
  choferAC: AbstractControl;
  aval1AC: AbstractControl;
  aval2AC: AbstractControl;
  aval3AC: AbstractControl;
  aval4AC: AbstractControl;
  deudafianzaAC: AbstractControl;
  deudaliquidacionAC: AbstractControl;
  constructor(
      private service: ChofersService,
      private estadosService: EstadosService,
      private personasService: PersonasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'licenciaAC' : ['',Validators.compose([Validators.maxLength(40)])],
    'fianzaAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    'estado_idestado_fianzaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    'choferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'aval1AC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'aval2AC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'aval3AC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'aval4AC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'deudafianzaAC' : [''],
    'deudaliquidacionAC' : [''],
  });
  this.licenciaAC = this.form.controls['licenciaAC'];
  this.fianzaAC = this.form.controls['fianzaAC'];
  this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
  this.estado_idestado_fianzaAC = this.form.controls['estado_idestado_fianzaAC'];
  this.choferAC = this.form.controls['choferAC'];
  this.aval1AC = this.form.controls['aval1AC'];
  this.aval2AC = this.form.controls['aval2AC'];
  this.aval3AC = this.form.controls['aval3AC'];
  this.aval4AC = this.form.controls['aval4AC'];
  this.deudafianzaAC = this.form.controls['deudafianzaAC'];
  this.deudaliquidacionAC = this.form.controls['deudaliquidacionAC'];
  }
  ngOnInit() {
      this.getEstado();
      this.getPersona();
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
  personaAddModalShow() {
      const disposable = this.dialogService.addDialog(PersonasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.personaShowToast(data);
          }
      })
  }

  personaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPersona();
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
  getPersona() {
      this.personasService.all()
      .subscribe(
          (data: any) => this._persona = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: ChofersInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idchofer: this.idchofer,
                  licencia: this.licencia,
                  fianza: this.fianza,
                  estado_idestado: this.estado_idestado,
                  estado_idestado_fianza: this.estado_idestado_fianza,
                  chofer: this.chofer,
                  aval1: this.aval1,
                  aval2: this.aval2,
                  aval3: this.aval3,
                  aval4: this.aval4,
                  deudafianza: this.deudafianza,
                  deudaliquidacion: this.deudaliquidacion,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
