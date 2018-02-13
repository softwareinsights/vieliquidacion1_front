import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { RefaccionsInterface } from './refaccions.interface';
import { RefaccionsResponseInterface } from './refaccions-response.interface';
import { Component, OnInit } from '@angular/core';
import { RefaccionsService } from './refaccions.service';
import { RefaccionsAddModalComponent } from './refaccions-add-modal/refaccions-add-modal.component';
import { RefaccionsEditModalComponent } from './refaccions-edit-modal/refaccions-edit-modal.component';
import { Orden_has_refaccionsInterface } from './../../../orden_has_refaccions/components/orden_has_refaccions-table/orden_has_refaccions.interface';
import { Orden_has_refaccionsAddModalComponent } from './../../../orden_has_refaccions/components/orden_has_refaccions-table/orden_has_refaccions-add-modal/orden_has_refaccions-add-modal.component';

@Component({
selector: 'refaccions-table',
templateUrl: './refaccions-table.html',
styleUrls: ['./refaccions-table.scss'],
})
export class RefaccionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idrefaccion';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: RefaccionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
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
    private findByIdTaller(id: number): void {
      this.service
        .findByIdTaller(id)
        .subscribe(
            (data: RefaccionsResponseInterface) => {
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
    insertOrden_has_refaccion(refaccions: RefaccionsInterface) {
      const orden_has_refaccion: Orden_has_refaccionsInterface = {
        refaccion_idrefaccion: refaccions.idrefaccion
      }
      const disposable = this.dialogService.addDialog(Orden_has_refaccionsAddModalComponent, orden_has_refaccion)
      .subscribe( data => {
          if (data) {
          this.orden_has_refaccionShowToast(data);
          }
      });
    }
    orden_has_refaccionShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrden_has_refaccion(refaccions: RefaccionsInterface) {
      this.router.navigate([`/pages/orden_has_refaccions/refaccion/${refaccions.idrefaccion}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(RefaccionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(refaccions: RefaccionsInterface) {
      const disposable = this.dialogService.addDialog(RefaccionsEditModalComponent, refaccions)
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
          this.service.remove(item.idrefaccion)
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
            (data: RefaccionsResponseInterface) =>  {
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
