import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PagofianzasService } from './../pagofianzas.service';
import { PagofianzasInterface } from './../pagofianzas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PagosService } from './../../../../pagos/components/pagos-table/pagos.service';
import { PagosAddModalComponent } from './../../../../pagos/components/pagos-table/pagos-add-modal/pagos-add-modal.component';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./pagofianzas-edit-modal.component.scss')],
  templateUrl: './pagofianzas-edit-modal.component.html'
})
export class PagofianzasEditModalComponent extends DialogComponent<PagofianzasInterface, any> implements OnInit, PagofianzasInterface {
  _pago: string[] = [];
  _chofer: string[] = [];

  idpagofianza: number;
  saldoanterior: number;
  montopagado: number;
  saldoactual: number;
  pago_idpago: number;
  chofer_idchofer: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  saldoanteriorAC: AbstractControl;
  montopagadoAC: AbstractControl;
  saldoactualAC: AbstractControl;
  pago_idpagoAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  constructor(
      private service: PagofianzasService,
      private pagosService: PagosService,
      private chofersService: ChofersService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'saldoanteriorAC' : [''],
    'montopagadoAC' : [''],
    'saldoactualAC' : [''],
    'pago_idpagoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.saldoanteriorAC = this.form.controls['saldoanteriorAC'];
  this.montopagadoAC = this.form.controls['montopagadoAC'];
  this.saldoactualAC = this.form.controls['saldoactualAC'];
  this.pago_idpagoAC = this.form.controls['pago_idpagoAC'];
  this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
  }
  ngOnInit() {
      this.getPago();
      this.getChofer();
  }

  pagoAddModalShow() {
      const disposable = this.dialogService.addDialog(PagosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.pagoShowToast(data);
          }
      })
  }

  pagoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPago();
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
      })
  }

  choferShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getChofer();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getPago() {
      this.pagosService.all()
      .subscribe(
          (data: any) => this._pago = data.result,
      );
  }
  getChofer() {
      this.chofersService.all()
      .subscribe(
          (data: any) => this._chofer = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: PagofianzasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpagofianza: this.idpagofianza,
                  saldoanterior: this.saldoanterior,
                  montopagado: this.montopagado,
                  saldoactual: this.saldoactual,
                  pago_idpago: this.pago_idpago,
                  chofer_idchofer: this.chofer_idchofer,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
