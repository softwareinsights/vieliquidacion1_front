import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxisInterface } from './permisotaxis.interface';
import { PermisotaxisResponseInterface } from './permisotaxis-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxisService } from './permisotaxis.service';
import { PermisotaxisAddModalComponent } from './permisotaxis-add-modal/permisotaxis-add-modal.component';
import { PermisotaxisEditModalComponent } from './permisotaxis-edit-modal/permisotaxis-edit-modal.component';
import { PermisotaxiasignadosInterface } from './../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.interface';
import { PermisotaxiasignadosAddModalComponent } from './../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';

@Component({
selector: 'permisotaxis-table',
templateUrl: './permisotaxis-table.html',
styleUrls: ['./permisotaxis-table.scss'],
})
export class PermisotaxisTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisotaxi';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: PermisotaxisService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idestado'] !== undefined) {
          const idestado = +params['idestado'];
          this.findByIdEstado(idestado);
          this.backpage = true;
        }        
        if (params['idpersona'] !== undefined) {
          const idpersona = +params['idpersona'];
          this.findByIdPersona(idpersona);
          this.backpage = true;
        }
        if (params['idvehiculo'] !== undefined) {
          const idvehiculo = +params['idvehiculo'];
          this.findByIdVehiculo(idvehiculo);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdEstado(id: number): void {
      this.service
        .findByIdEstado(id)
        .subscribe(
            (data: PermisotaxisResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdPersona(id: number): void {
      this.service
        .findByIdPersona(id)
        .subscribe(
            (data: PermisotaxisResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdVehiculo(id: number): void {
      this.service
        .findByIdVehiculo(id)
        .subscribe(
            (data: PermisotaxisResponseInterface) => {
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
    insertPermisotaxiasignado(permisotaxis: PermisotaxisInterface) {
      const permisotaxiasignado: PermisotaxiasignadosInterface = {
        permisotaxi_idpermisotaxi: permisotaxis.idpermisotaxi
      }
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosAddModalComponent, permisotaxiasignado)
      .subscribe( data => {
          if (data) {
          this.permisotaxiasignadoShowToast(data);
          }
      });
    }
    permisotaxiasignadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPermisotaxiasignado(permisotaxis: PermisotaxisInterface) {
      this.router.navigate([`/pages/permisotaxiasignados/permisotaxi/${permisotaxis.idpermisotaxi}`]);
    }
 liquidacionShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
      } else {
          this.toastrService.error(result.message);
      }
  }
    viewBitacora(permisotaxis: PermisotaxisInterface) {
      this.router.navigate([`/pages/liquidacions/permisotaxi/${permisotaxis.idpermisotaxi}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxisAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(permisotaxis: PermisotaxisInterface) {
      const disposable = this.dialogService.addDialog(PermisotaxisEditModalComponent, permisotaxis)
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
          this.service.remove(item.idpermisotaxi)
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

    verBitacora(permisotaxis: PermisotaxisInterface) {
      this.router.navigate([`/pages/reportes/bitacora-pagos-permiso/${permisotaxis.idpermisotaxi}`]);
    }

    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: PermisotaxisResponseInterface) =>  {
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
