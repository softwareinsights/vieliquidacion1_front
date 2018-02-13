import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { VehiculosInterface } from './vehiculos.interface';
import { VehiculosResponseInterface } from './vehiculos-response.interface';
import { Component, OnInit } from '@angular/core';
import { VehiculosService } from './vehiculos.service';
import { VehiculosAddModalComponent } from './vehiculos-add-modal/vehiculos-add-modal.component';
import { VehiculosEditModalComponent } from './vehiculos-edit-modal/vehiculos-edit-modal.component';
import { PermisotaxisInterface } from './../../../permisotaxis/components/permisotaxis-table/permisotaxis.interface';
import { PermisotaxisAddModalComponent } from './../../../permisotaxis/components/permisotaxis-table/permisotaxis-add-modal/permisotaxis-add-modal.component';

@Component({
selector: 'vehiculos-table',
templateUrl: './vehiculos-table.html',
styleUrls: ['./vehiculos-table.scss'],
})
export class VehiculosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idvehiculo';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: VehiculosService, 
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
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdEstado(id: number): void {
      this.service
        .findByIdEstado(id)
        .subscribe(
            (data: VehiculosResponseInterface) => {
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
            (data: VehiculosResponseInterface) => {
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
    insertPermisotaxi(vehiculos: VehiculosInterface) {
      const permisotaxi: PermisotaxisInterface = {
        vehiculo_idvehiculo: vehiculos.idvehiculo
      }
      const disposable = this.dialogService.addDialog(PermisotaxisAddModalComponent, permisotaxi)
      .subscribe( data => {
          if (data) {
          this.permisotaxiShowToast(data);
          }
      });
    }
    permisotaxiShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPermisotaxi(vehiculos: VehiculosInterface) {
      this.router.navigate([`/pages/permisotaxis/vehiculo/${vehiculos.idvehiculo}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(VehiculosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(vehiculos: VehiculosInterface) {
      const disposable = this.dialogService.addDialog(VehiculosEditModalComponent, vehiculos)
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
          this.service.remove(item.idvehiculo)
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
            (data: VehiculosResponseInterface) =>  {
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
