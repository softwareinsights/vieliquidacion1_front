import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EgresoconceptosService } from './../egresoconceptos.service';
import { EgresoconceptosInterface } from './../egresoconceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TallersService } from './../../../../tallers/components/tallers-table/tallers.service';
import { TallersAddModalComponent } from './../../../../tallers/components/tallers-table/tallers-add-modal/tallers-add-modal.component';
import { ConceptosService } from './../../../../conceptos/components/conceptos-table/conceptos.service';
import { ConceptosAddModalComponent } from './../../../../conceptos/components/conceptos-table/conceptos-add-modal/conceptos-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./egresoconceptos-add-modal.component.scss')],
  templateUrl: './egresoconceptos-add-modal.component.html'
})
export class EgresoconceptosAddModalComponent extends DialogComponent<EgresoconceptosInterface, any> implements OnInit, EgresoconceptosInterface {
  _taller: string[] = [];
  _concepto: string[] = [];

  fecha: string;
  hora: string;
  total: number;
  taller_idtaller: number;
  concepto_idconcepto: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  totalAC: AbstractControl;
  taller_idtallerAC: AbstractControl;
  concepto_idconceptoAC: AbstractControl;

  constructor(
    private service: EgresoconceptosService,
    private tallersService: TallersService,
    private conceptosService: ConceptosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'fechaAC' : [''],
    'horaAC' : [''],
    'totalAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'taller_idtallerAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'concepto_idconceptoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
    this.totalAC = this.form.controls['totalAC'];
    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
    this.concepto_idconceptoAC = this.form.controls['concepto_idconceptoAC'];
  }
  ngOnInit() {
      this.getTaller();
      this.getConcepto();
  }
  tallerAddModalShow() {
      const disposable = this.dialogService.addDialog(TallersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.tallerShowToast(data);
          }
      });
  }
  tallerShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getTaller();
      } else {
          this.toastrService.error(result.message);
      }
  }
  conceptoAddModalShow() {
      const disposable = this.dialogService.addDialog(ConceptosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.conceptoShowToast(data);
          }
      });
  }
  conceptoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getConcepto();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getTaller() {
      this.tallersService.all()
      .subscribe(
          (data: any) => this._taller = data.result,
      );
  }
  getConcepto() {
      this.conceptosService.all()
      .subscribe(
          (data: any) => this._concepto = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: EgresoconceptosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  fecha: this.fecha,
                  hora: this.hora,
                  total: this.total,
                  taller_idtaller: this.taller_idtaller,
                  concepto_idconcepto: this.concepto_idconcepto,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
