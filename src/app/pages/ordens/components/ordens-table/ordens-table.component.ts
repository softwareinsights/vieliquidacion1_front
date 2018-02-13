import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { OrdensInterface } from './ordens.interface';
import { OrdensResponseInterface } from './ordens-response.interface';
import { Component, OnInit } from '@angular/core';
import { OrdensService } from './ordens.service';
import { OrdensAddModalComponent } from './ordens-add-modal/ordens-add-modal.component';
import { OrdensEditModalComponent } from './ordens-edit-modal/ordens-edit-modal.component';
@Component({
selector: 'ordens-table',
templateUrl: './ordens-table.html',
styleUrls: ['./ordens-table.scss'],
})
export class OrdensTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idorden';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: OrdensService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idvehiculoreparando'] !== undefined) {
          const idvehiculoreparando = +params['idvehiculoreparando'];
          this.findByIdVehiculoreparando(idvehiculoreparando);
          this.backpage = true;
        }
        if (params['idestado'] !== undefined) {
          const idestado = +params['idestado'];
          this.findByIdEstado(idestado);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdVehiculoreparando(id: number): void {
      this.service
        .findByIdVehiculoreparando(id)
        .subscribe(
            (data: OrdensResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdEstado(id: number): void {
      this.service
        .findByIdEstado(id)
        .subscribe(
            (data: OrdensResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(OrdensAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(ordens: OrdensInterface) {
      const disposable = this.dialogService.addDialog(OrdensEditModalComponent, ordens)
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
          this.service.remove(item.idorden)
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
            (data: OrdensResponseInterface) =>  {
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
