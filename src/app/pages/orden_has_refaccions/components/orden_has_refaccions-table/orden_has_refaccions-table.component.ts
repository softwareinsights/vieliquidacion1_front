import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Orden_has_refaccionsInterface } from './orden_has_refaccions.interface';
import { Orden_has_refaccionsResponseInterface } from './orden_has_refaccions-response.interface';
import { Component, OnInit } from '@angular/core';
import { Orden_has_refaccionsService } from './orden_has_refaccions.service';
import { Orden_has_refaccionsAddModalComponent } from './orden_has_refaccions-add-modal/orden_has_refaccions-add-modal.component';
import { Orden_has_refaccionsEditModalComponent } from './orden_has_refaccions-edit-modal/orden_has_refaccions-edit-modal.component';

@Component({
selector: 'orden_has_refaccions-table',
templateUrl: './orden_has_refaccions-table.html',
styleUrls: ['./orden_has_refaccions-table.scss'],
})
export class Orden_has_refaccionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idorden_has_refaccion';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: Orden_has_refaccionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idorden'] !== undefined) {
          const idorden = +params['idorden'];
          this.findByIdOrden(idorden);
          this.backpage = true;
        }
        if (params['idrefaccion'] !== undefined) {
          const idrefaccion = +params['idrefaccion'];
          this.findByIdRefaccion(idrefaccion);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdOrden(id: number): void {
      this.service
        .findByIdOrden(id)
        .subscribe(
            (data: Orden_has_refaccionsResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdRefaccion(id: number): void {
      this.service
        .findByIdRefaccion(id)
        .subscribe(
            (data: Orden_has_refaccionsResponseInterface) => {
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
    addModalShow() {
      const disposable = this.dialogService.addDialog(Orden_has_refaccionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(orden_has_refaccions: Orden_has_refaccionsInterface) {
      const disposable = this.dialogService.addDialog(Orden_has_refaccionsEditModalComponent, orden_has_refaccions)
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
          this.service.remove(item.idorden_has_refaccion)
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
            (data: Orden_has_refaccionsResponseInterface) =>  {
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
