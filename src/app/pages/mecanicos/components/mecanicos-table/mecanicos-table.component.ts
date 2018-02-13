import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { MecanicosInterface } from './mecanicos.interface';
import { MecanicosResponseInterface } from './mecanicos-response.interface';
import { Component, OnInit } from '@angular/core';
import { MecanicosService } from './mecanicos.service';
import { MecanicosAddModalComponent } from './mecanicos-add-modal/mecanicos-add-modal.component';
import { MecanicosEditModalComponent } from './mecanicos-edit-modal/mecanicos-edit-modal.component';
import { VehiculoreparandosInterface } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.interface';
import { VehiculoreparandosAddModalComponent } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';

@Component({
selector: 'mecanicos-table',
templateUrl: './mecanicos-table.html',
styleUrls: ['./mecanicos-table.scss'],
})
export class MecanicosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idmecanico';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: MecanicosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idpersona'] !== undefined) {
          const idpersona = +params['idpersona'];
          this.findByIdPersona(idpersona);
          this.backpage = true;
        }
        if (params['idtaller'] !== undefined) {
          const idtaller = +params['idtaller'];
          this.findByIdTaller(idtaller);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdPersona(id: number): void {
      this.service
        .findByIdPersona(id)
        .subscribe(
            (data: MecanicosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdTaller(id: number): void {
      this.service
        .findByIdTaller(id)
        .subscribe(
            (data: MecanicosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    backPage() {
        window.history.back();
    }
    insertVehiculoreparando(mecanicos: MecanicosInterface) {
      const vehiculoreparando: VehiculoreparandosInterface = {
        mecanico_idmecanico: mecanicos.idmecanico
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
    viewVehiculoreparando(mecanicos: MecanicosInterface) {
      this.router.navigate([`/pages/vehiculoreparandos/mecanico/${mecanicos.idmecanico}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(MecanicosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(mecanicos: MecanicosInterface) {
      const disposable = this.dialogService.addDialog(MecanicosEditModalComponent, mecanicos)
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
          this.service.remove(item.idmecanico)
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
            (data: MecanicosResponseInterface) =>  {
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
