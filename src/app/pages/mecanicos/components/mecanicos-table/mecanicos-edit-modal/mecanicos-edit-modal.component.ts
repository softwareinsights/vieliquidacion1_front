import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { MecanicosService } from './../mecanicos.service';
import { MecanicosInterface } from './../mecanicos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PersonasAddModalComponent } from './../../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';
import { TallersService } from './../../../../tallers/components/tallers-table/tallers.service';
import { TallersAddModalComponent } from './../../../../tallers/components/tallers-table/tallers-add-modal/tallers-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./mecanicos-edit-modal.component.scss')],
  templateUrl: './mecanicos-edit-modal.component.html'
})
export class MecanicosEditModalComponent extends DialogComponent<MecanicosInterface, any> implements OnInit, MecanicosInterface {
  _persona: string[] = [];
  _taller: string[] = [];

  idmecanico: number;
  persona_idpersona: number;
  taller_idtaller: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  persona_idpersonaAC: AbstractControl;
  taller_idtallerAC: AbstractControl;
  constructor(
      private service: MecanicosService,
      private personasService: PersonasService,
      private tallersService: TallersService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'persona_idpersonaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'taller_idtallerAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.persona_idpersonaAC = this.form.controls['persona_idpersonaAC'];
  this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
  }
  ngOnInit() {
      this.getPersona();
      this.getTaller();
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
  getPersona() {
      this.personasService.all()
      .subscribe(
          (data: any) => this._persona = data.result,
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
  onSubmit(values: MecanicosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idmecanico: this.idmecanico,
                  persona_idpersona: this.persona_idpersona,
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
