import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PagobonificacionsService } from './../pagobonificacions.service';
import { PagobonificacionsInterface } from './../pagobonificacions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BonificacionsService } from './../../../../bonificacions/components/bonificacions-table/bonificacions.service';
import { BonificacionsAddModalComponent } from './../../../../bonificacions/components/bonificacions-table/bonificacions-add-modal/bonificacions-add-modal.component';
import { PagosService } from './../../../../pagos/components/pagos-table/pagos.service';
import { PagosAddModalComponent } from './../../../../pagos/components/pagos-table/pagos-add-modal/pagos-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./pagobonificacions-add-modal.component.scss')],
  templateUrl: './pagobonificacions-add-modal.component.html'
})
export class PagobonificacionsAddModalComponent extends DialogComponent<PagobonificacionsInterface, any> implements OnInit {
  _bonificacion: string[] = [];
  _pago: string[] = [];

  idpagobonificacion: number;
  bonificacion_idbonificacion: number;
  pago_idpago: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idpagobonificacionAC: AbstractControl;
  bonificacion_idbonificacionAC: AbstractControl;
  pago_idpagoAC: AbstractControl;

  constructor(
    private service: PagobonificacionsService,
    private bonificacionsService: BonificacionsService,
    private pagosService: PagosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idpagobonificacionAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'bonificacion_idbonificacionAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'pago_idpagoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.idpagobonificacionAC = this.form.controls['idpagobonificacionAC'];
    this.bonificacion_idbonificacionAC = this.form.controls['bonificacion_idbonificacionAC'];
    this.pago_idpagoAC = this.form.controls['pago_idpagoAC'];
  }
  ngOnInit() {
      this.getBonificacion();
      this.getPago();
  }
  bonificacionAddModalShow() {
      const disposable = this.dialogService.addDialog(BonificacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.bonificacionShowToast(data);
          }
      });
  }
  bonificacionShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getBonificacion();
      } else {
          this.toastrService.error(result.message);
      }
  }
  pagoAddModalShow() {
      const disposable = this.dialogService.addDialog(PagosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.pagoShowToast(data);
          }
      });
  }
  pagoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPago();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getBonificacion() {
      this.bonificacionsService.all()
      .subscribe(
          (data: any) => this._bonificacion = data.result,
      );
  }
  getPago() {
      this.pagosService.all()
      .subscribe(
          (data: any) => this._pago = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PagobonificacionsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  idpagobonificacion: this.idpagobonificacion,
                  bonificacion_idbonificacion: this.bonificacion_idbonificacion,
                  pago_idpago: this.pago_idpago,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
