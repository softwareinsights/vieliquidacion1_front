import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { BonificacionsService } from './../bonificacions.service';
import { BonificacionsInterface } from './../bonificacions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./bonificacions-edit-modal.component.scss')],
  templateUrl: './bonificacions-edit-modal.component.html'
})
export class BonificacionsEditModalComponent extends DialogComponent<BonificacionsInterface, any> implements OnInit, BonificacionsInterface {
  _estado: string[] = [];
  _chofer: string[] = [];

  idbonificacion: number;
  cantidad: string;
  validado: boolean;
  fecha: string;
  estado_idestado: number;
  concepto: string;
  chofer_idchofer: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  cantidadAC: AbstractControl;
  validadoAC: AbstractControl;
  fechaAC: AbstractControl;
  estado_idestadoAC: AbstractControl;
  conceptoAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  constructor(
      private service: BonificacionsService,
      private estadosService: EstadosService,
      private chofersService: ChofersService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'cantidadAC' : [''],
    'validadoAC' : [''],
    'fechaAC' : [''],
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    'conceptoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.cantidadAC = this.form.controls['cantidadAC'];
  this.validadoAC = this.form.controls['validadoAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
  this.conceptoAC = this.form.controls['conceptoAC'];
  this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
  }
  ngOnInit() {
      this.getEstado();
      this.getChofer();
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
  getEstado() {
      this.estadosService.all()
      .subscribe(
          (data: any) => this._estado = data.result,
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
  onSubmit(values: BonificacionsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idbonificacion: this.idbonificacion,
                  cantidad: this.cantidad,
                  validado: this.validado,
                  fecha: this.fecha,
                  estado_idestado: this.estado_idestado,
                  concepto: this.concepto,
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
