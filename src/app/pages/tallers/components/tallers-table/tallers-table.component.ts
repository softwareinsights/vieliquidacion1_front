import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TallersInterface } from './tallers.interface';
import { TallersResponseInterface } from './tallers-response.interface';
import { Component, OnInit } from '@angular/core';
import { TallersService } from './tallers.service';
import { TallersAddModalComponent } from './tallers-add-modal/tallers-add-modal.component';
import { TallersEditModalComponent } from './tallers-edit-modal/tallers-edit-modal.component';
import { EgresoconceptosInterface } from './../../../egresoconceptos/components/egresoconceptos-table/egresoconceptos.interface';
import { EgresoconceptosAddModalComponent } from './../../../egresoconceptos/components/egresoconceptos-table/egresoconceptos-add-modal/egresoconceptos-add-modal.component';
import { EnviotallersInterface } from './../../../enviotallers/components/enviotallers-table/enviotallers.interface';
import { EnviotallersAddModalComponent } from './../../../enviotallers/components/enviotallers-table/enviotallers-add-modal/enviotallers-add-modal.component';
import { MecanicosInterface } from './../../../mecanicos/components/mecanicos-table/mecanicos.interface';
import { MecanicosAddModalComponent } from './../../../mecanicos/components/mecanicos-table/mecanicos-add-modal/mecanicos-add-modal.component';
import { RefaccionsInterface } from './../../../refaccions/components/refaccions-table/refaccions.interface';
import { RefaccionsAddModalComponent } from './../../../refaccions/components/refaccions-table/refaccions-add-modal/refaccions-add-modal.component';
import { VehiculoreparandosInterface } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.interface';
import { VehiculoreparandosAddModalComponent } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';

@Component({
selector: 'tallers-table',
templateUrl: './tallers-table.html',
styleUrls: ['./tallers-table.scss'],
})
export class TallersTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtaller';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: TallersService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertEgresoconcepto(tallers: TallersInterface) {
      const egresoconcepto: EgresoconceptosInterface = {
        taller_idtaller: tallers.idtaller
      }
      const disposable = this.dialogService.addDialog(EgresoconceptosAddModalComponent, egresoconcepto)
      .subscribe( data => {
          if (data) {
          this.egresoconceptoShowToast(data);
          }
      });
    }
    egresoconceptoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewEgresoconcepto(tallers: TallersInterface) {
      this.router.navigate([`/pages/egresoconceptos/taller/${tallers.idtaller}`]);
    }
    insertEnviotaller(tallers: TallersInterface) {
      const enviotaller: EnviotallersInterface = {
        taller_idtaller: tallers.idtaller
      }
      const disposable = this.dialogService.addDialog(EnviotallersAddModalComponent, enviotaller)
      .subscribe( data => {
          if (data) {
          this.enviotallerShowToast(data);
          }
      });
    }
    enviotallerShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewEnviotaller(tallers: TallersInterface) {
      this.router.navigate([`/pages/enviotallers/taller/${tallers.idtaller}`]);
    }
    insertMecanico(tallers: TallersInterface) {
      const mecanico: MecanicosInterface = {
        taller_idtaller: tallers.idtaller
      }
      const disposable = this.dialogService.addDialog(MecanicosAddModalComponent, mecanico)
      .subscribe( data => {
          if (data) {
          this.mecanicoShowToast(data);
          }
      });
    }
    mecanicoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewMecanico(tallers: TallersInterface) {
      this.router.navigate([`/pages/mecanicos/taller/${tallers.idtaller}`]);
    }
    insertRefaccion(tallers: TallersInterface) {
      const refaccion: RefaccionsInterface = {
        taller_idtaller: tallers.idtaller
      }
      const disposable = this.dialogService.addDialog(RefaccionsAddModalComponent, refaccion)
      .subscribe( data => {
          if (data) {
          this.refaccionShowToast(data);
          }
      });
    }
    refaccionShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewRefaccion(tallers: TallersInterface) {
      this.router.navigate([`/pages/refaccions/taller/${tallers.idtaller}`]);
    }
    insertVehiculoreparando(tallers: TallersInterface) {
      const vehiculoreparando: VehiculoreparandosInterface = {
        taller_idtaller: tallers.idtaller
      }
      const disposable = this.dialogService.addDialog(VehiculoreparandosAddModalComponent, vehiculoreparando)
      .subscribe( data => {
          if (data) {
          this.vehiculoreparandoShowToast(data);
          }
      });
    }
    vehiculoreparandoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewVehiculoreparando(tallers: TallersInterface) {
      this.router.navigate([`/pages/vehiculoreparandos/taller/${tallers.idtaller}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TallersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(tallers: TallersInterface) {
      const disposable = this.dialogService.addDialog(TallersEditModalComponent, tallers)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    onDeleteConfirm(event, item): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
          this.service.remove(item.idtaller)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }
    showToast(result) {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: TallersResponseInterface) =>  {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
