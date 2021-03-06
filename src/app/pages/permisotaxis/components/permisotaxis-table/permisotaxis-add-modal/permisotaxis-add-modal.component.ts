import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxisService } from './../permisotaxis.service';
import { PermisotaxisInterface } from './../permisotaxis.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PersonasAddModalComponent } from './../../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';
import { VehiculosService } from './../../../../vehiculos/components/vehiculos-table/vehiculos.service';
import { VehiculosAddModalComponent } from './../../../../vehiculos/components/vehiculos-table/vehiculos-add-modal/vehiculos-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./permisotaxis-add-modal.component.scss')],
  templateUrl: './permisotaxis-add-modal.component.html'
})
export class PermisotaxisAddModalComponent extends DialogComponent<PermisotaxisInterface, any> implements OnInit, PermisotaxisInterface {
  _estado: string[] = [];
  _persona: string[] = [];
  _vehiculo: string[] = [];

  numero: string;
  estado_idestado: number;
  fechaAlta: string;
  vigencia: string;
  liquidez: number;
  liquidezDom: number;
  propietario: number;
  vehiculo_idvehiculo: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  numeroAC: AbstractControl;
  estado_idestadoAC: AbstractControl;
  fechaAltaAC: AbstractControl;
  vigenciaAC: AbstractControl;
  liquidezAC: AbstractControl;
  liquidezDomAC: AbstractControl;
  propietarioAC: AbstractControl;
  vehiculo_idvehiculoAC: AbstractControl;

  constructor(
    private service: PermisotaxisService,
    private estadosService: EstadosService,
    private personasService: PersonasService,
    private vehiculosService: VehiculosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'numeroAC' : ['',Validators.compose([Validators.required,Validators.maxLength(45)])],
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
    'fechaAltaAC' : [''],
    'vigenciaAC' : [''],
    'liquidezAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'liquidezDomAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'propietarioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'vehiculo_idvehiculoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.numeroAC = this.form.controls['numeroAC'];
    this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
    this.fechaAltaAC = this.form.controls['fechaAltaAC'];
    this.vigenciaAC = this.form.controls['vigenciaAC'];
    this.liquidezAC = this.form.controls['liquidezAC'];
    this.liquidezDomAC = this.form.controls['liquidezDomAC'];
    this.propietarioAC = this.form.controls['propietarioAC'];
    this.vehiculo_idvehiculoAC = this.form.controls['vehiculo_idvehiculoAC'];
  }
  ngOnInit() {
      this.getEstado();
      this.getPersona();
      this.getVehiculo();
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
  personaAddModalShow() {
      const disposable = this.dialogService.addDialog(PersonasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.personaShowToast(data);
          }
      });
  }
  personaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPersona();
      } else {
          this.toastrService.error(result.message);
      }
  }
  vehiculoAddModalShow() {
      const disposable = this.dialogService.addDialog(VehiculosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.vehiculoShowToast(data);
          }
      });
  }
  vehiculoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getVehiculo();
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
  getPersona() {
      this.personasService.all()
      .subscribe(
          (data: any) => this._persona = data.result,
      );
  }
  getVehiculo() {
      this.vehiculosService.all()
      .subscribe(
          (data: any) => this._vehiculo = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PermisotaxisInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  numero: this.numero,
                  estado_idestado: this.estado_idestado,
                  fechaAlta: this.fechaAlta,
                  vigencia: this.vigencia,
                  liquidez: this.liquidez,
                  liquidezDom: this.liquidezDom,
                  propietario: this.propietario,
                  vehiculo_idvehiculo: this.vehiculo_idvehiculo,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
