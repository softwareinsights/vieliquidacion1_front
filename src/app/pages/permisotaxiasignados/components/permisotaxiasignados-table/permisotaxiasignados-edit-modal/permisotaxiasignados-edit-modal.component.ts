import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxiasignadosService } from './../permisotaxiasignados.service';
import { PermisotaxiasignadosInterface } from './../permisotaxiasignados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
import { PermisotaxisService } from './../../../../permisotaxis/components/permisotaxis-table/permisotaxis.service';
import { PermisotaxisAddModalComponent } from './../../../../permisotaxis/components/permisotaxis-table/permisotaxis-add-modal/permisotaxis-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisotaxiasignados-edit-modal.component.scss')],
  templateUrl: './permisotaxiasignados-edit-modal.component.html'
})
export class PermisotaxiasignadosEditModalComponent extends DialogComponent<PermisotaxiasignadosInterface, any> implements OnInit, PermisotaxiasignadosInterface {
  _estado: string[] = [];
  _chofer: string[] = [];
  _permisotaxi: string[] = [];

  idpermisotaxiasignado: number;
  estado_idestado: number;
  fecha: string;
  hora: string;
  chofer_idchofer: number;
  permisotaxi_idpermisotaxi: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  estado_idestadoAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  permisotaxi_idpermisotaxiAC: AbstractControl;
  constructor(
      private service: PermisotaxiasignadosService,
      private estadosService: EstadosService,
      private chofersService: ChofersService,
      private permisotaxisService: PermisotaxisService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    'fechaAC' : [''],
    'horaAC' : [''],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'permisotaxi_idpermisotaxiAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.horaAC = this.form.controls['horaAC'];
  this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
  this.permisotaxi_idpermisotaxiAC = this.form.controls['permisotaxi_idpermisotaxiAC'];
  }
  ngOnInit() {
      this.getEstado();
      this.getChofer();
      this.getPermisotaxi();
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
  permisotaxiAddModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxisAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.permisotaxiShowToast(data);
          }
      })
  }

  permisotaxiShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPermisotaxi();
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
  getPermisotaxi() {
      this.permisotaxisService.all()
      .subscribe(
          (data: any) => this._permisotaxi = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: PermisotaxiasignadosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpermisotaxiasignado: this.idpermisotaxiasignado,
                  estado_idestado: this.estado_idestado,
                  fecha: this.fecha,
                  hora: this.hora,
                  chofer_idchofer: this.chofer_idchofer,
                  permisotaxi_idpermisotaxi: this.permisotaxi_idpermisotaxi,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
