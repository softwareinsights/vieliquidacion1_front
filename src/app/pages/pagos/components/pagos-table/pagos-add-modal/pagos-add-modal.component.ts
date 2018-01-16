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
import { BonificacionsService } from './../../../../bonificacions/components/bonificacions-table/bonificacions.service';
import { BonificacionsAddModalComponent } from './../../../../bonificacions/components/bonificacions-table/bonificacions-add-modal/bonificacions-add-modal.component';
import { PagobonificacionsService } from './../../../../pagobonificacions/components/pagobonificacions-table/pagobonificacions.service';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./pagos-add-modal.component.scss')],
  templateUrl: './pagos-add-modal.component.html'
})
export class PagosAddModalComponent extends DialogComponent<PagosInterface, any> implements OnInit {
  _estado: string[] = [];
  _chofer: string[] = [];
  _bonificacion: string[] = [];

  cantidadRecibida: number;
  cambio: number;
  kilometraje: number;
  fecha: string;
  hora: string;
  nota: string;
  cantPagada: number;
  estado_idestado: number;
  bonificado: number;
  descripcion: string;
  folio: string;
  fianza: string;
  liquidacion: string;
  chofer_idchofer: number;
  pagobonificacion: any[];

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
  bonificadoAC: AbstractControl;
  descripcionAC: AbstractControl;
  folioAC: AbstractControl;
  fianzaAC: AbstractControl;
  liquidacionAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  pagobonificacionAC: AbstractControl;

  constructor(
    private service: PagosService,
    private estadosService: EstadosService,
    private chofersService: ChofersService,
    private bonificacionsService: BonificacionsService,
    private pagobonificacionsService: PagobonificacionsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
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
    'bonificadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(200)])],
    'folioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(30)])],
    'fianzaAC' : [''],
    'liquidacionAC' : [''],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'pagobonificacionAC' : [''],
    });
    this.cantidadRecibidaAC = this.form.controls['cantidadRecibidaAC'];
    this.cambioAC = this.form.controls['cambioAC'];
    this.kilometrajeAC = this.form.controls['kilometrajeAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
    this.notaAC = this.form.controls['notaAC'];
    this.cantPagadaAC = this.form.controls['cantPagadaAC'];
    this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
    this.bonificadoAC = this.form.controls['bonificadoAC'];
    this.descripcionAC = this.form.controls['descripcionAC'];
    this.folioAC = this.form.controls['folioAC'];
    this.fianzaAC = this.form.controls['fianzaAC'];
    this.liquidacionAC = this.form.controls['liquidacionAC'];
    this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
    this.pagobonificacionAC = this.form.controls['pagobonificacionAC'];
  }
  ngOnInit() {
      this.getEstado();
      this.getChofer();
      this.getBonificacion();
  }
  estadoAddModalShow() {
      const disposable = this.dialogService.addDialog(EstadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.estadoShowToast(data);
          }
      });
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
      });
  }
  choferShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getChofer();
      } else {
          this.toastrService.error(result.message);
      }
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
  getBonificacion() {
      this.bonificacionsService.all()
      .subscribe(
          (data: any) => this._bonificacion = data.result,
      );
  }
  postPagobonificacion(data) {
      this.pagobonificacionsService.insert(data)
      .subscribe(
          (result: any) => {
              this.data = result;
              this.confirm();
          });
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PagosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  cantidadRecibida: this.cantidadRecibida,
                  cambio: this.cambio,
                  kilometraje: this.kilometraje,
                  fecha: this.fecha,
                  hora: this.hora,
                  nota: this.nota,
                  cantPagada: this.cantPagada,
                  estado_idestado: this.estado_idestado,
                  bonificado: this.bonificado,
                  descripcion: this.descripcion,
                  folio: this.folio,
                  fianza: this.fianza,
                  liquidacion: this.liquidacion,
                  chofer_idchofer: this.chofer_idchofer,
        })
        .subscribe(
            (data: any) => {
              if (data.success) {
                  this.pagobonificacion.forEach(element => {
                      this.postPagobonificacion({
                          pago_idpago: data.result.insertId,
                          bonificacion_idbonificacion: +element,
                      });
                  });
              } else {
                  this.data = data;
                  this.confirm();
              }
            });
    }
  }
}
