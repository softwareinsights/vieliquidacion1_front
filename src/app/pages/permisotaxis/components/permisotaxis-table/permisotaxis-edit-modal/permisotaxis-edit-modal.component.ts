import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxisService } from './../permisotaxis.service';
import { PermisotaxisInterface } from './../permisotaxis.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PersonasAddModalComponent } from './../../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisotaxis-edit-modal.component.scss')],
  templateUrl: './permisotaxis-edit-modal.component.html'
})
export class PermisotaxisEditModalComponent extends DialogComponent<PermisotaxisInterface, any> implements OnInit, PermisotaxisInterface {
  _estado: string[] = [];
  _persona: string[] = [];

  idpermisotaxi: number;
  numero: string;
  estado_idestado: number;
  fechaAlta: string;
  vigencia: string;
  liquidez: number;
  liquidezDom: number;
  propietario: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  numeroAC: AbstractControl;
  estado_idestadoAC: AbstractControl;
  fechaAltaAC: AbstractControl;
  vigenciaAC: AbstractControl;
  liquidezAC: AbstractControl;
  liquidezDomAC: AbstractControl;
  propietarioAC: AbstractControl;
  constructor(
      private service: PermisotaxisService,
      private estadosService: EstadosService,
      private personasService: PersonasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'numeroAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    'fechaAltaAC' : [''],
    'vigenciaAC' : [''],
    'liquidezAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'liquidezDomAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'propietarioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.numeroAC = this.form.controls['numeroAC'];
  this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
  this.fechaAltaAC = this.form.controls['fechaAltaAC'];
  this.vigenciaAC = this.form.controls['vigenciaAC'];
  this.liquidezAC = this.form.controls['liquidezAC'];
  this.liquidezDomAC = this.form.controls['liquidezDomAC'];
  this.propietarioAC = this.form.controls['propietarioAC'];
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
      this.estadosService.disponibles()
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
  onSubmit(values: PermisotaxisInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpermisotaxi: this.idpermisotaxi,
                  numero: this.numero,
                  estado_idestado: this.estado_idestado,
                  fechaAlta: this.fechaAlta,
                  vigencia: this.vigencia,
                  liquidez: this.liquidez,
                  liquidezDom: this.liquidezDom,
                  propietario: this.propietario,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
