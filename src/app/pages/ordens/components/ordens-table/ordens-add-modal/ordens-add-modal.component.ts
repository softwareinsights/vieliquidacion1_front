import { Orden_has_refaccionsInterface } from './../../../../orden_has_refaccions/components/orden_has_refaccions-table/orden_has_refaccions.interface';
import { RefaccionsInterface } from './../../../../refaccions/components/refaccions-table/refaccions.interface';
import { RefaccionesModalComponent } from './../../refacciones-modal/refacciones-modal.component';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdensService } from './../ordens.service';
import { OrdensInterface } from './../ordens.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { VehiculoreparandosService } from './../../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.service';
import { VehiculoreparandosAddModalComponent } from './../../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';
import { RefaccionsService } from './../../../../refaccions/components/refaccions-table/refaccions.service';
import { RefaccionsAddModalComponent } from './../../../../refaccions/components/refaccions-table/refaccions-add-modal/refaccions-add-modal.component';
import { Orden_has_refaccionsService } from './../../../../orden_has_refaccions/components/orden_has_refaccions-table/orden_has_refaccions.service';



@Component({
  selector: 'add-service-modal',
  styleUrls: [('./ordens-add-modal.component.scss')],
  templateUrl: './ordens-add-modal.component.html'
})
export class OrdensAddModalComponent extends DialogComponent<OrdensInterface, any> implements OnInit {
  _estado: string[] = [];
  _vehiculoreparando: string[] = [];
  _refaccion: string[] = [];

  fecha: string;
  hora: string;
  manoObra: number;
  subtotal: number;
  total: number;
  anticipo: number;
  estado_idestado: number;
  descripcion: string;
  vehiculoreparando_idvehiculoreparando: number;
  orden_has_refaccion: any[];

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  manoObraAC: AbstractControl;
  subtotalAC: AbstractControl;
  totalAC: AbstractControl;
  anticipoAC: AbstractControl;
  estado_idestadoAC: AbstractControl;
  descripcionAC: AbstractControl;
  vehiculoreparando_idvehiculoreparandoAC: AbstractControl;
  orden_has_refaccionAC: AbstractControl;

  refaccionIdrefaccionAC: AbstractControl;
  refaccionCantidadAC: AbstractControl;
  refaccionPrecioAC: AbstractControl;

  orden: OrdensInterface = {
    idorden: null,
    fecha: new Date().toLocaleDateString(),
    descripcion: '',
    estado_idestado: 6,
    manoObra: 0,
    subtotal: 0,
    total: 0,
    anticipo: 0,
    vehiculoreparando_idvehiculoreparando: 0
  }
  refaccionSelected: RefaccionsInterface = {
    idrefaccion: null,
    nombre: '',
    precioCompra: null,
    precioVenta: null,
    taller_idtaller: null
  }
  refaccionCantidad = 1;
  refaccionPrecio = 0;
  refacciones: any[] = [];



  constructor(
    private service: OrdensService,
    private estadosService: EstadosService,
    private vehiculoreparandosService: VehiculoreparandosService,
    private refaccionsService: RefaccionsService,
    private orden_has_refaccionsService: Orden_has_refaccionsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'fechaAC' : [''],
    'horaAC' : [''],

    'refaccionIdrefaccionAC': [''],
    'refaccionCantidadAC': [''],
    'refaccionPrecioAC': [''],

    'manoObraAC' : ['', Validators.compose([Validators.maxLength(11)])],
    'subtotalAC' : ['', Validators.compose([Validators.maxLength(11)])],
    'totalAC' : ['', Validators.compose([Validators.maxLength(11)])],
    'anticipoAC' : ['', Validators.compose([Validators.maxLength(11)])],
    'estado_idestadoAC' : ['', Validators.compose([Validators.required, Validators.maxLength(3)])],
    'descripcionAC' : ['', Validators.compose([Validators.maxLength(200)])],
    'vehiculoreparando_idvehiculoreparandoAC' : ['', Validators.compose([Validators.required,Validators.maxLength(11)])],
    'orden_has_refaccionAC' : [''],
    });
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
    this.manoObraAC = this.form.controls['manoObraAC'];
    this.subtotalAC = this.form.controls['subtotalAC'];
    this.totalAC = this.form.controls['totalAC'];
    this.anticipoAC = this.form.controls['anticipoAC'];
    this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
    this.descripcionAC = this.form.controls['descripcionAC'];
    this.vehiculoreparando_idvehiculoreparandoAC = this.form.controls['vehiculoreparando_idvehiculoreparandoAC'];
    this.orden_has_refaccionAC = this.form.controls['orden_has_refaccionAC'];

    this.refaccionIdrefaccionAC = this.form.controls['refaccionIdrefaccionAC'];
    this.refaccionCantidadAC = this.form.controls['refaccionCantidadAC'];
    this.refaccionPrecioAC = this.form.controls['refaccionPrecioAC'];

    // FECHA Y HORA ACTUAL
    const date = new Date();
    const month = (date.getMonth() + 1);
    const now = date.getFullYear() + "-" + ((month < 10) ? "0" : "") + month + "-" + date.getDate();
    const hour = date.getHours() + ":" + date.getMinutes();

    this.fecha = now;
    this.hora = hour;
    this.estado_idestado = 6;

    this.manoObra = 0;
    this.anticipo = 0;
    this.subtotal = 0;
    this.total = 0;
  }
  ngOnInit() {
      this.getEstado();
      this.getVehiculoreparando();
      this.getRefaccion();
  }

  showRefaccionesModal() {
    const refaccions: RefaccionsInterface = {
    };

    this.dialogService.addDialog( RefaccionesModalComponent, refaccions )
      .subscribe( refaccion => {
          console.log("refaccion", refaccion);
        if ( refaccion ) {
          this.refaccionSelected = refaccion;
          this.refaccionCantidad = 1;
          this.refaccionPrecio = refaccion.precioVenta;
        }
      });
  }

  setPrecioVenta() {
    if ( this.refaccionSelected.precioVenta && this.refaccionPrecio > 0 ) {
      this.refaccionPrecio = this.refaccionSelected.precioVenta * this.refaccionCantidad;
    }
  }

  addToList() {
    if ( this.refaccionSelected.idrefaccion !== null ) {
      this.refacciones.push({
        idrefaccion: this.refaccionSelected.idrefaccion,
        nombre: this.refaccionSelected.nombre,
        precioVenta: this.refaccionSelected.precioVenta,
        cantidad: this.refaccionCantidad,
      })
      this.addToSubtotal( this.refaccionCantidad * this.refaccionSelected.precioVenta )
      // Inicializa los valores por cada agregar a la lista
      this.refaccionSelected = {
        idrefaccion: null,
        nombre: '',
        precioCompra: null,
        precioVenta: null,
        taller_idtaller: null,
      }
      this.refaccionCantidad = 1;
      this.refaccionPrecio = 0;
    }
  }
  addToSubtotal( cantidad ) {
    this.subtotal += cantidad;
    this.addToTotal( cantidad );
  }

  addToTotal( cantidad ) {
    this.total += cantidad;
  }

  calculateTotal() {
    this.total = 0;
    this.total += this.subtotal;
    this.total += this.manoObra;
    this.total -= this.anticipo;
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
  vehiculoreparandoAddModalShow() {
      const disposable = this.dialogService.addDialog(VehiculoreparandosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.vehiculoreparandoShowToast(data);
          }
      });
  }
  vehiculoreparandoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getVehiculoreparando();
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
  getEstado() {
      this.estadosService.all()
      .subscribe(
          (data: any) => this._estado = data.result,
      );
  }
  getVehiculoreparando() {
      this.vehiculoreparandosService.all()
      .subscribe(
          (data: any) => this._vehiculoreparando = data.result,
      );
  }
  getRefaccion() {
      this.refaccionsService.all()
      .subscribe(
          (data: any) => this._refaccion = data.result,
      );
  }
  postOrden_has_refaccion(data: Orden_has_refaccionsInterface) {
      console.log("data Orden_has_refaccionsInterface", data);
      this.orden_has_refaccionsService.insert(data)
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
  onSubmit(values: OrdensInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  fecha: this.fecha,
                  hora: this.hora,
                  manoObra: this.manoObra,
                  subtotal: this.subtotal,
                  total: this.total,
                  anticipo: this.anticipo,
                  estado_idestado: this.estado_idestado,
                  descripcion: this.descripcion,
                  vehiculoreparando_idvehiculoreparando: this.vehiculoreparando_idvehiculoreparando,
        })
        .subscribe(
            (data: any) => {
              if (data.success) {
                  this.refacciones.forEach(element => {
                      this.postOrden_has_refaccion({
                          orden_idorden: data.result.insertId,
                          refaccion_idrefaccion: +element.idrefaccion,
                          cantidad: element.cantidad,
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
