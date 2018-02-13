import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PagosService } from './../pagos.service';
import { PagosInterface } from './../pagos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./pagos-edit-modal.component.scss')],
  templateUrl: './pagos-edit-modal.component.html'
})
export class PagosEditModalComponent extends DialogComponent<PagosInterface, any> implements OnInit, PagosInterface {
  _estado: string[] = [];
  _chofer: string[] = [];

  idpago: number;
  cantidadRecibida: number;
  cambio: number;
  kilometraje: number;
  fecha: string;
  hora: string;
  nota: string;
  cantPagada: number;
  estado_idestado: number;
  descripcion: string;
  folio: string;
  liquidacion: number;
  foliofianza: string;
  fianza: number;
  chofer_idchofer: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  cantidadRecibidaAC: AbstractControl;
  cambioAC: AbstractControl;
  kilometrajeAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  notaAC: AbstractControl;
  cantPagadaAC: AbstractControl;
  estado_idestadoAC: AbstractControl;
  descripcionAC: AbstractControl;
  folioAC: AbstractControl;
  liquidacionAC: AbstractControl;
  foliofianzaAC: AbstractControl;
  fianzaAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  constructor(
      private service: PagosService,
      private estadosService: EstadosService,
      private chofersService: ChofersService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'cantidadRecibidaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'cambioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'kilometrajeAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'fechaAC' : [''],
    'horaAC' : [''],
    'notaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(60)])],
    'cantPagadaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(200)])],
    'folioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(30)])],
    'liquidacionAC' : [''],
    'foliofianzaAC' : ['',Validators.compose([Validators.maxLength(30)])],
    'fianzaAC' : [''],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.cantidadRecibidaAC = this.form.controls['cantidadRecibidaAC'];
  this.cambioAC = this.form.controls['cambioAC'];
  this.kilometrajeAC = this.form.controls['kilometrajeAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.horaAC = this.form.controls['horaAC'];
  this.notaAC = this.form.controls['notaAC'];
  this.cantPagadaAC = this.form.controls['cantPagadaAC'];
  this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
  this.descripcionAC = this.form.controls['descripcionAC'];
  this.folioAC = this.form.controls['folioAC'];
  this.liquidacionAC = this.form.controls['liquidacionAC'];
  this.foliofianzaAC = this.form.controls['foliofianzaAC'];
  this.fianzaAC = this.form.controls['fianzaAC'];
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
  onSubmit(values: PagosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpago: this.idpago,
                  cantidadRecibida: this.cantidadRecibida,
                  cambio: this.cambio,
                  kilometraje: this.kilometraje,
                  fecha: this.fecha,
                  hora: this.hora,
                  nota: this.nota,
                  cantPagada: this.cantPagada,
                  estado_idestado: this.estado_idestado,
                  descripcion: this.descripcion,
                  folio: this.folio,
                  liquidacion: this.liquidacion,
                  foliofianza: this.foliofianza,
                  fianza: this.fianza,
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
