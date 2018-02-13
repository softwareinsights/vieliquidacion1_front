import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EnviotallersInterface } from './enviotallers.interface';
import { EnviotallersResponseInterface } from './enviotallers-response.interface';
import { Component, OnInit } from '@angular/core';
import { EnviotallersService } from './enviotallers.service';
import { EnviotallersAddModalComponent } from './enviotallers-add-modal/enviotallers-add-modal.component';
import { EnviotallersEditModalComponent } from './enviotallers-edit-modal/enviotallers-edit-modal.component';
import { VehiculoreparandosInterface } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos.interface';
import { VehiculoreparandosAddModalComponent } from './../../../vehiculoreparandos/components/vehiculoreparandos-table/vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';

@Component({
selector: 'enviotallers-table',
templateUrl: './enviotallers-table.html',
styleUrls: ['./enviotallers-table.scss'],
})
export class EnviotallersTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idenviotaller';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: EnviotallersService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idmantenimiento'] !== undefined) {
          const idmantenimiento = params['idmantenimiento'];
          this.findByIdMantenimiento(idmantenimiento);
          this.backpage = true;
        }
        if (params['idpermisotaxiasignado'] !== undefined) {
          const idpermisotaxiasignado = +params['idpermisotaxiasignado'];
          this.findByIdPermisotaxiasignado(idpermisotaxiasignado);
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
    private findByIdMantenimiento(id: number): void {
      this.service
        .findByIdMantenimiento(id)
        .subscribe(
            (data: EnviotallersResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdPermisotaxiasignado(id: number): void {
      this.service
        .findByIdPermisotaxiasignado(id)
        .subscribe(
            (data: EnviotallersResponseInterface) => {
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
            (data: EnviotallersResponseInterface) => {
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
    insertVehiculoreparando(enviotallers: EnviotallersInterface) {
      const vehiculoreparando: VehiculoreparandosInterface = {
        enviotaller_idenviotaller: enviotallers.idenviotaller
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
    viewVehiculoreparando(enviotallers: EnviotallersInterface) {
      this.router.navigate([`/pages/vehiculoreparandos/enviotaller/${enviotallers.idenviotaller}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EnviotallersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(enviotallers: EnviotallersInterface) {
      const disposable = this.dialogService.addDialog(EnviotallersEditModalComponent, enviotallers)
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
          this.service.remove(item.idenviotaller)
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
            (data: EnviotallersResponseInterface) =>  {
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
