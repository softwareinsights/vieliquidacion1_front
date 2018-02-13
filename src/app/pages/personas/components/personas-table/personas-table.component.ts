import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PersonasInterface } from './personas.interface';
import { PersonasResponseInterface } from './personas-response.interface';
import { Component, OnInit } from '@angular/core';
import { PersonasService } from './personas.service';
import { PersonasAddModalComponent } from './personas-add-modal/personas-add-modal.component';
import { PersonasEditModalComponent } from './personas-edit-modal/personas-edit-modal.component';
import { ChofersInterface } from './../../../chofers/components/chofers-table/chofers.interface';
import { ChofersAddModalComponent } from './../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
import { MecanicosInterface } from './../../../mecanicos/components/mecanicos-table/mecanicos.interface';
import { MecanicosAddModalComponent } from './../../../mecanicos/components/mecanicos-table/mecanicos-add-modal/mecanicos-add-modal.component';
import { PermisotaxisInterface } from './../../../permisotaxis/components/permisotaxis-table/permisotaxis.interface';
import { PermisotaxisAddModalComponent } from './../../../permisotaxis/components/permisotaxis-table/permisotaxis-add-modal/permisotaxis-add-modal.component';
import { VehiculosInterface } from './../../../vehiculos/components/vehiculos-table/vehiculos.interface';
import { VehiculosAddModalComponent } from './../../../vehiculos/components/vehiculos-table/vehiculos-add-modal/vehiculos-add-modal.component';

@Component({
selector: 'personas-table',
templateUrl: './personas-table.html',
styleUrls: ['./personas-table.scss'],
})
export class PersonasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpersona';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: PersonasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertChofer(personas: PersonasInterface) {
      const chofer: ChofersInterface = {
        chofer: personas.idpersona
      }
      const disposable = this.dialogService.addDialog(ChofersAddModalComponent, chofer)
      .subscribe( data => {
          if (data) {
          this.choferShowToast(data);
          }
      });
    }
    choferShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewChofer(personas: PersonasInterface) {
      this.router.navigate([`/pages/chofers/persona/${personas.idpersona}`]);
    }
    insertMecanico(personas: PersonasInterface) {
      const mecanico: MecanicosInterface = {
        persona_idpersona: personas.idpersona
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
    viewMecanico(personas: PersonasInterface) {
      this.router.navigate([`/pages/mecanicos/persona/${personas.idpersona}`]);
    }
    insertPermisotaxi(personas: PersonasInterface) {
      const permisotaxi: PermisotaxisInterface = {
        propietario: personas.idpersona
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
    viewPermisotaxi(personas: PersonasInterface) {
      this.router.navigate([`/pages/permisotaxis/persona/${personas.idpersona}`]);
    }
    insertVehiculo(personas: PersonasInterface) {
      const vehiculo: VehiculosInterface = {
        propietario: personas.idpersona
      }
      const disposable = this.dialogService.addDialog(VehiculosAddModalComponent, vehiculo)
      .subscribe( data => {
          if (data) {
          this.vehiculoShowToast(data);
          }
      });
    }
    vehiculoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewVehiculo(personas: PersonasInterface) {
      this.router.navigate([`/pages/vehiculos/persona/${personas.idpersona}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PersonasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(personas: PersonasInterface) {
      const disposable = this.dialogService.addDialog(PersonasEditModalComponent, personas)
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
          this.service.remove(item.idpersona)
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
            (data: PersonasResponseInterface) =>  {
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
