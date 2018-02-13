import { PagoliquidacionsService } from './../../../../pagoliquidacions/components/pagoliquidacions-table/pagoliquidacions.service';
import { LiquidacionsService } from './../../../../liquidacions/components/liquidacions-table/liquidacions.service';
import { ChofersResponseInterface } from './../../../../chofers/components/chofers-table/chofers-response.interface';
import { ChofersInterface } from './../../../../chofers/components/chofers-table/chofers.interface';
import { PagofianzasService } from './../../../../pagofianzas/components/pagofianzas-table/pagofianzas.service';
import { PagofianzasInterface } from './../../../../pagofianzas/components/pagofianzas-table/pagofianzas.interface';
import { PagoliquidacionsInterface } from './../../../../pagoliquidacions/components/pagoliquidacions-table/pagoliquidacions.interface';


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
export class PagosAddModalComponent extends DialogComponent<PagosInterface, any> implements OnInit, PagosInterface {
  _estado: string[] = [];
  _chofer: string[] = [];
  _bonificacion: string[] = [];
  _liquidacion: string[] = [];

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
  pagobonificacion: any[];
  pagoliquidacion: any[];

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
  pagobonificacionAC: AbstractControl;
  pagoliquidacionAC: AbstractControl;

  constructor(
    private service: PagosService,
    private estadosService: EstadosService,
    private chofersService: ChofersService,
    private bonificacionsService: BonificacionsService,
    private pagobonificacionsService: PagobonificacionsService,
    private liquidacionsService: LiquidacionsService,
    private pagoliquidacionsService: PagoliquidacionsService,
    private pagofianzasService: PagofianzasService,
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
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(200)])],
    'folioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(30)])],
    'liquidacionAC' : [''],
    'foliofianzaAC' : ['',Validators.compose([Validators.maxLength(30)])],
    'fianzaAC' : [''],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'pagobonificacionAC' : [''],
    'pagoliquidacionAC' : [''],
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
    this.pagobonificacionAC = this.form.controls['pagobonificacionAC'];
    this.pagoliquidacionAC = this.form.controls['pagoliquidacionAC'];
  }
  ngOnInit() {
      this.getEstado();
      this.getChofer();
      this.getBonificacion();
      this.getLiquidacion();
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




  getLiquidacion() {
      // MÉTODO ALLADEUDANDOFROMIDCHOFER
      this.liquidacionsService.allAdeudandoFromIdChofer(this.chofer_idchofer)
      .subscribe(
          (data: any) => this._liquidacion = data.result,
      );
  }
  choferChange() {
      this.liquidacionsService.allAdeudandoFromIdChofer(this.chofer_idchofer)
      .subscribe(
          (data: any) => this._liquidacion = data.result,
      );
  }
  updateChoferFianza(data: ChofersInterface) {
      this.chofersService.update(data)
      .subscribe(
          (result: any) => {
              this.data = result;
              this.confirm();
          });
  }
  postPagofianza(data: PagofianzasInterface) {
      this.pagofianzasService.insert(data)
      .subscribe(
          (result: any) => {
              this.data = result;
              this.confirm();
          });
  }
  postPagoliquidacion(data: PagoliquidacionsInterface) {
      this.pagoliquidacionsService.insert(data)
      .subscribe(
          (result: any) => {
              this.data = result;
              this.confirm();
          });
  }

  updateChoferById(idChofer: number) {
      this.chofersService.findById(idChofer)
      .subscribe(
          (chofer: ChofersResponseInterface) => {
              if (chofer.success) {
                  
                const deudafianza = chofer.result[0].deudafianza - this.fianza;
                let idestado = 0;
                if (deudafianza <= 0) {
                    idestado = 8; // Pagado
                } else {
                    idestado = 9; // Adeudando
                }    

                this.updateChoferFianza({
                    'idchofer': this.chofer_idchofer,
                    'deudafianza': deudafianza,
                    'estado_idestado_fianza': idestado,
                });
              }
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
                  descripcion: this.descripcion,
                  folio: this.folio,
                  liquidacion: this.liquidacion,
                  foliofianza: this.foliofianza,
                  fianza: this.fianza,
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


                  // REVISAR QUE ESTÉ CORRECTAMENTE FUNCIONANDO******
                    this.postPagofianza({
                        pago_idpago: data.result.insertId,
                        montopagado: this.fianza,
                        chofer_idchofer: this.chofer_idchofer,
                    });
                    
                    // Update a deuda fianza
                    this.updateChoferById(this.chofer_idchofer);

                    this.pagoliquidacion.forEach(element => {
                        this.postPagoliquidacion({
                            pago_idpago: data.result.insertId,
                            liquidacion_idliquidacion: +element,
                            chofer_idchofer: this.chofer_idchofer,
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
