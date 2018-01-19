import { VehiculosService } from './../../../vehiculos/components/vehiculos-table/vehiculos.service';
import { ChofersService } from './../../../chofers/components/chofers-table/chofers.service';
import { ChofersInterface } from './../../../chofers/components/chofers-table/chofers.interface';
import { VehiculosInterface } from './../../../vehiculos/components/vehiculos-table/vehiculos.interface';


import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CorralonsInterface } from './corralons.interface';
import { CorralonsResponseInterface } from './corralons-response.interface';
import { Component, OnInit } from '@angular/core';
import { CorralonsService } from './corralons.service';
import { CorralonsAddModalComponent } from './corralons-add-modal/corralons-add-modal.component';
import { CorralonsEditModalComponent } from './corralons-edit-modal/corralons-edit-modal.component';
@Component({
selector: 'corralons-table',
templateUrl: './corralons-table.html',
styleUrls: ['./corralons-table.scss'],
})
export class CorralonsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcorralon';
    sortOrder = 'asc';
    constructor(
      private service: CorralonsService, 

      private vehiculosService: VehiculosService,
      private chofersService: ChofersService,

      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }

    goOutCorralon(corralons: CorralonsInterface) {
      this.service.goOutCorralon(corralons)
      .subscribe(
          (data) => {
            if (data.success) {
              this.showToast(data);

                // Update a vehiculo
                const vehiculo: VehiculosInterface = {
                  idvehiculo: data.result.idvehiculo,
                  estado_idestado: 19 // DISPONIBLE
                }
                this.vehiculosService
                .update(vehiculo)
                .subscribe(
                    (data: any) => {
                      this.showToast(data);
                });

                // Update a chofer
                const chofer: ChofersInterface = {
                  idchofer: data.result.idchofer,
                  estado_idestado: 5 // ACTIVO
                }
                this.chofersService
                .update(chofer)
                .subscribe(
                    (data: any) => {
                      this.showToast(data);
                });
                
            }
          });
    }

    addModalShow() {
      const disposable = this.dialogService.addDialog(CorralonsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(corralons: CorralonsInterface) {
      const disposable = this.dialogService.addDialog(CorralonsEditModalComponent, corralons)
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
          this.service.remove(item.idcorralon)
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
            (data: CorralonsResponseInterface) =>  {
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
