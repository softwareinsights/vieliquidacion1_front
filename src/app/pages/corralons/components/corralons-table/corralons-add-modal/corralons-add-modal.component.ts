import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CorralonsService } from './../corralons.service';
import { CorralonsInterface } from './../corralons.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { PermisotaxiasignadosService } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';
import { PermisotaxiasignadosAddModalComponent } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./corralons-add-modal.component.scss')],
  templateUrl: './corralons-add-modal.component.html'
})
export class CorralonsAddModalComponent extends DialogComponent<CorralonsInterface, any> implements OnInit {
  _estado: string[] = [];
  _permisotaxiasignado: string[] = [];

  fecha: string;
  hora: string;
  fechaSalida: string;
  horaSalida: string;
  infraccionNumero: number;
  corralonNombre: string;
  motivo: string;
  estado_idestado: number;
  permisotaxiasignado_idpermisotaxiasignado: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  fechaSalidaAC: AbstractControl;
  horaSalidaAC: AbstractControl;
  infraccionNumeroAC: AbstractControl;
  corralonNombreAC: AbstractControl;
  motivoAC: AbstractControl;
  estado_idestadoAC: AbstractControl;
  permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;

  constructor(
    private service: CorralonsService,
    private estadosService: EstadosService,
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'fechaAC' : [''],
    'horaAC' : [''],
    'fechaSalidaAC' : [''],
    'horaSalidaAC' : [''],
    'infraccionNumeroAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'corralonNombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'motivoAC' : ['',Validators.compose([Validators.maxLength(150)])],
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    'permisotaxiasignado_idpermisotaxiasignadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
    this.fechaSalidaAC = this.form.controls['fechaSalidaAC'];
    this.horaSalidaAC = this.form.controls['horaSalidaAC'];
    this.infraccionNumeroAC = this.form.controls['infraccionNumeroAC'];
    this.corralonNombreAC = this.form.controls['corralonNombreAC'];
    this.motivoAC = this.form.controls['motivoAC'];
    this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
    this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];
  }
  ngOnInit() {
      this.getEstado();
      this.getPermisotaxiasignado();
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
  getEstado() {
      this.estadosService.all()
      .subscribe(
          (data: any) => this._estado = data.result,
      );
  }
  getPermisotaxiasignado() {
      this.permisotaxiasignadosService.all()
      .subscribe(
          (data: any) => this._permisotaxiasignado = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: CorralonsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  fecha: this.fecha,
                  hora: this.hora,
                  fechaSalida: this.fechaSalida,
                  horaSalida: this.horaSalida,
                  infraccionNumero: this.infraccionNumero,
                  corralonNombre: this.corralonNombre,
                  motivo: this.motivo,
                  estado_idestado: this.estado_idestado,
                  permisotaxiasignado_idpermisotaxiasignado: this.permisotaxiasignado_idpermisotaxiasignado,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
