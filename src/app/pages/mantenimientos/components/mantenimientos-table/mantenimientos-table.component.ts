import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { MantenimientosInterface } from './mantenimientos.interface';
import { MantenimientosResponseInterface } from './mantenimientos-response.interface';
import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from './mantenimientos.service';
import { MantenimientosAddModalComponent } from './mantenimientos-add-modal/mantenimientos-add-modal.component';
import { MantenimientosEditModalComponent } from './mantenimientos-edit-modal/mantenimientos-edit-modal.component';
import { EnviotallersInterface } from './../../../enviotallers/components/enviotallers-table/enviotallers.interface';
import { EnviotallersAddModalComponent } from './../../../enviotallers/components/enviotallers-table/enviotallers-add-modal/enviotallers-add-modal.component';

@Component({
selector: 'mantenimientos-table',
templateUrl: './mantenimientos-table.html',
styleUrls: ['./mantenimientos-table.scss'],
})
export class MantenimientosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idmantenimiento';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: MantenimientosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertEnviotaller(mantenimientos: MantenimientosInterface) {
      const enviotaller: EnviotallersInterface = {
        mantenimiento_idmantenimiento: mantenimientos.idmantenimiento
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
    viewEnviotaller(mantenimientos: MantenimientosInterface) {
      this.router.navigate([`/pages/enviotallers/mantenimiento/${mantenimientos.idmantenimiento}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(MantenimientosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(mantenimientos: MantenimientosInterface) {
      const disposable = this.dialogService.addDialog(MantenimientosEditModalComponent, mantenimientos)
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
          this.service.remove(item.idmantenimiento)
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
            (data: MantenimientosResponseInterface) =>  {
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
