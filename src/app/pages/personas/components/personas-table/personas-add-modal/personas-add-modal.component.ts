import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PersonasService } from './../personas.service';
import { PersonasInterface } from './../personas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./personas-add-modal.component.scss')],
  templateUrl: './personas-add-modal.component.html'
})
export class PersonasAddModalComponent extends DialogComponent<PersonasInterface, any> implements OnInit, PersonasInterface {

  nombre: string;
  edad: number;
  sexo: string;
  rfc: string;
  telefono: number;
  domicilio: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  nombreAC: AbstractControl;
  edadAC: AbstractControl;
  sexoAC: AbstractControl;
  rfcAC: AbstractControl;
  telefonoAC: AbstractControl;
  domicilioAC: AbstractControl;

  constructor(
    private service: PersonasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'nombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'edadAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'sexoAC' : ['',Validators.compose([Validators.maxLength(15)])],
    'rfcAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'telefonoAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'domicilioAC' : ['',Validators.compose([Validators.maxLength(60)])],
    });
    this.nombreAC = this.form.controls['nombreAC'];
    this.edadAC = this.form.controls['edadAC'];
    this.sexoAC = this.form.controls['sexoAC'];
    this.rfcAC = this.form.controls['rfcAC'];
    this.telefonoAC = this.form.controls['telefonoAC'];
    this.domicilioAC = this.form.controls['domicilioAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PersonasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  nombre: this.nombre,
                  edad: this.edad,
                  sexo: this.sexo,
                  rfc: this.rfc,
                  telefono: this.telefono,
                  domicilio: this.domicilio,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
