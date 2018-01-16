import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TallersService } from './../tallers.service';
import { TallersInterface } from './../tallers.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./tallers-add-modal.component.scss')],
  templateUrl: './tallers-add-modal.component.html'
})
export class TallersAddModalComponent extends DialogComponent<TallersInterface, any> implements OnInit {

  nombre: string;
  direccion: string;
  telefono: number;
  descripcion: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  nombreAC: AbstractControl;
  direccionAC: AbstractControl;
  telefonoAC: AbstractControl;
  descripcionAC: AbstractControl;

  constructor(
    private service: TallersService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'nombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'direccionAC' : ['',Validators.compose([Validators.maxLength(80)])],
    'telefonoAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(80)])],
    });
    this.nombreAC = this.form.controls['nombreAC'];
    this.direccionAC = this.form.controls['direccionAC'];
    this.telefonoAC = this.form.controls['telefonoAC'];
    this.descripcionAC = this.form.controls['descripcionAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: TallersInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  nombre: this.nombre,
                  direccion: this.direccion,
                  telefono: this.telefono,
                  descripcion: this.descripcion,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
