import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { LiquidacionsService } from './../liquidacions.service';
import { LiquidacionsInterface } from './../liquidacions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxiasignadosService } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';
import { PermisotaxiasignadosAddModalComponent } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./liquidacions-add-modal.component.scss')],
  templateUrl: './liquidacions-add-modal.component.html'
})
export class LiquidacionsAddModalComponent extends DialogComponent<LiquidacionsInterface, any> implements OnInit {
  _permisotaxiasignado: string[] = [];
  _chofer: string[] = [];
  _estado: string[] = [];

  fecha: string;
  montoapagar: string;
  h_corte: string;
  saldoactual: string;
  permisotaxiasignado_idpermisotaxiasignado: number;
  chofer_idchofer: number;
  estado_idestado: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  fechaAC: AbstractControl;
  montoapagarAC: AbstractControl;
  h_corteAC: AbstractControl;
  saldoactualAC: AbstractControl;
  permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  estado_idestadoAC: AbstractControl;

  constructor(
    private service: LiquidacionsService,
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    private chofersService: ChofersService,
    private estadosService: EstadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'fechaAC' : [''],
    'montoapagarAC' : [''],
    'h_corteAC' : [''],
    'saldoactualAC' : [''],
    'permisotaxiasignado_idpermisotaxiasignadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    });
    this.fechaAC = this.form.controls['fechaAC'];
    this.montoapagarAC = this.form.controls['montoapagarAC'];
    this.h_corteAC = this.form.controls['h_corteAC'];
    this.saldoactualAC = this.form.controls['saldoactualAC'];
    this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];
    this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
    this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
  }
  ngOnInit() {
      this.getPermisotaxiasignado();
      this.getChofer();
      this.getEstado();
  }
  permisotaxiasignadoAddModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.permisotaxiasignadoShowToast(data);
          }
      });
  }
  permisotaxiasignadoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPermisotaxiasignado();
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
  getPermisotaxiasignado() {
      this.permisotaxiasignadosService.all()
      .subscribe(
          (data: any) => this._permisotaxiasignado = data.result,
      );
  }
  getChofer() {
      this.chofersService.all()
      .subscribe(
          (data: any) => this._chofer = data.result,
      );
  }
  getEstado() {
      this.estadosService.all()
      .subscribe(
          (data: any) => this._estado = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: LiquidacionsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  fecha: this.fecha,
                  montoapagar: this.montoapagar,
                  h_corte: this.h_corte,
                  saldoactual: this.saldoactual,
                  permisotaxiasignado_idpermisotaxiasignado: this.permisotaxiasignado_idpermisotaxiasignado,
                  chofer_idchofer: this.chofer_idchofer,
                  estado_idestado: this.estado_idestado,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
