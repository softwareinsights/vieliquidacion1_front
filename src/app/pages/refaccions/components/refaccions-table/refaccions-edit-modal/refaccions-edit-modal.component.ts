import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { RefaccionsService } from './../refaccions.service';
import { RefaccionsInterface } from './../refaccions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TallersService } from './../../../../tallers/components/tallers-table/tallers.service';
import { TallersAddModalComponent } from './../../../../tallers/components/tallers-table/tallers-add-modal/tallers-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./refaccions-edit-modal.component.scss')],
  templateUrl: './refaccions-edit-modal.component.html'
})
export class RefaccionsEditModalComponent extends DialogComponent<RefaccionsInterface, any> implements OnInit, RefaccionsInterface {
  _taller: string[] = [];

  idrefaccion: number;
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  taller_idtaller: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nombreAC: AbstractControl;
  precioCompraAC: AbstractControl;
  precioVentaAC: AbstractControl;
  taller_idtallerAC: AbstractControl;
  constructor(
      private service: RefaccionsService,
      private tallersService: TallersService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'nombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'precioCompraAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'precioVentaAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'taller_idtallerAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.nombreAC = this.form.controls['nombreAC'];
  this.precioCompraAC = this.form.controls['precioCompraAC'];
  this.precioVentaAC = this.form.controls['precioVentaAC'];
  this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
  }
  ngOnInit() {
      this.getTaller();
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
  onSubmit(values: RefaccionsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idrefaccion: this.idrefaccion,
                  nombre: this.nombre,
                  precioCompra: this.precioCompra,
                  precioVenta: this.precioVenta,
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
