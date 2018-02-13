import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { MantenimientosService } from './../mantenimientos.service';
import { MantenimientosInterface } from './../mantenimientos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./mantenimientos-add-modal.component.scss')],
  templateUrl: './mantenimientos-add-modal.component.html'
})
export class MantenimientosAddModalComponent extends DialogComponent<MantenimientosInterface, any> implements OnInit, MantenimientosInterface {

  idmantenimiento: string;
  kminicial: number;
  kmfinal: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idmantenimientoAC: AbstractControl;
  kminicialAC: AbstractControl;
  kmfinalAC: AbstractControl;

  constructor(
    private service: MantenimientosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idmantenimientoAC' : ['', Validators.compose([ Validators.required, Validators.maxLength(25)])],
    'kminicialAC' : ['', Validators.compose([ Validators.maxLength(11)])],
    'kmfinalAC' : ['', Validators.compose([ Validators.maxLength(11)])],
    });
    this.idmantenimientoAC = this.form.controls['idmantenimientoAC'];
    this.kminicialAC = this.form.controls['kminicialAC'];
    this.kmfinalAC = this.form.controls['kmfinalAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: MantenimientosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  idmantenimiento: this.idmantenimiento,
                  kminicial: this.kminicial,
                  kmfinal: this.kmfinal,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
