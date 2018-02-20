import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Orden_has_refaccionsService } from './../orden_has_refaccions.service';
import { Orden_has_refaccionsInterface } from './../orden_has_refaccions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdensService } from './../../../../ordens/components/ordens-table/ordens.service';
import { OrdensAddModalComponent } from './../../../../ordens/components/ordens-table/ordens-add-modal/ordens-add-modal.component';
import { RefaccionsService } from './../../../../refaccions/components/refaccions-table/refaccions.service';
import { RefaccionsAddModalComponent } from './../../../../refaccions/components/refaccions-table/refaccions-add-modal/refaccions-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./orden_has_refaccions-add-modal.component.scss')],
  templateUrl: './orden_has_refaccions-add-modal.component.html'
})
export class Orden_has_refaccionsAddModalComponent extends DialogComponent<Orden_has_refaccionsInterface, any> implements OnInit, Orden_has_refaccionsInterface {
  _orden: string[] = [];
  _refaccion: string[] = [];

  orden_idorden: number;
  refaccion_idrefaccion: number;
  cantidad: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  orden_idordenAC: AbstractControl;
  refaccion_idrefaccionAC: AbstractControl;
  cantidadAC: AbstractControl;

  constructor(
    private service: Orden_has_refaccionsService,
    private ordensService: OrdensService,
    private refaccionsService: RefaccionsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'orden_idordenAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'refaccion_idrefaccionAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'cantidadAC' : ['',Validators.compose([Validators.maxLength(11)])],
    });
    this.orden_idordenAC = this.form.controls['orden_idordenAC'];
    this.refaccion_idrefaccionAC = this.form.controls['refaccion_idrefaccionAC'];
    this.cantidadAC = this.form.controls['cantidadAC'];
  }
  ngOnInit() {
      this.getOrden();
      this.getRefaccion();
  }
  ordenAddModalShow() {
      const disposable = this.dialogService.addDialog(OrdensAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ordenShowToast(data);
          }
      });
  }
  ordenShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getOrden();
      } else {
          this.toastrService.error(result.message);
      }
  }
  refaccionAddModalShow() {
      const disposable = this.dialogService.addDialog(RefaccionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.refaccionShowToast(data);
          }
      });
  }
  refaccionShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getRefaccion();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getOrden() {
      this.ordensService.all()
      .subscribe(
          (data: any) => this._orden = data.result,
      );
  }
  getRefaccion() {
      this.refaccionsService.all()
      .subscribe(
          (data: any) => this._refaccion = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: Orden_has_refaccionsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  orden_idorden: this.orden_idorden,
                  refaccion_idrefaccion: this.refaccion_idrefaccion,
                  cantidad: this.cantidad,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
