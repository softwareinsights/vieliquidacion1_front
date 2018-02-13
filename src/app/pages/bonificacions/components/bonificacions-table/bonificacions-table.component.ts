import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { BonificacionsInterface } from './bonificacions.interface';
import { BonificacionsResponseInterface } from './bonificacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { BonificacionsService } from './bonificacions.service';
import { BonificacionsAddModalComponent } from './bonificacions-add-modal/bonificacions-add-modal.component';
import { BonificacionsEditModalComponent } from './bonificacions-edit-modal/bonificacions-edit-modal.component';
import { PagobonificacionsInterface } from './../../../pagobonificacions/components/pagobonificacions-table/pagobonificacions.interface';
import { PagobonificacionsAddModalComponent } from './../../../pagobonificacions/components/pagobonificacions-table/pagobonificacions-add-modal/pagobonificacions-add-modal.component';

@Component({
selector: 'bonificacions-table',
templateUrl: './bonificacions-table.html',
styleUrls: ['./bonificacions-table.scss'],
})
export class BonificacionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idbonificacion';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: BonificacionsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idchofer'] !== undefined) {
          const idchofer = +params['idchofer'];
          this.findByIdChofer(idchofer);
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

    validateBonification(bonificacions: BonificacionsInterface) {
      const bonificacion = {
        'validado': true,
        'idbonificacion': bonificacions.idbonificacion,
      }
      this.service.update(bonificacion)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
    }
    applyBonification(bonificacions: BonificacionsInterface) {
      this.service.applyBonification(bonificacions)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
    }

    private findByIdChofer(id: number): void {
      this.service
        .findByIdChofer(id)
        .subscribe(
            (data: BonificacionsResponseInterface) => {
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
            (data: BonificacionsResponseInterface) => {
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
    insertPagobonificacion(bonificacions: BonificacionsInterface) {
      const pagobonificacion: PagobonificacionsInterface = {
        bonificacion_idbonificacion: bonificacions.idbonificacion
      }
      const disposable = this.dialogService.addDialog(PagobonificacionsAddModalComponent, pagobonificacion)
      .subscribe( data => {
          if (data) {
          this.pagobonificacionShowToast(data);
          }
      });
    }
    pagobonificacionShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPagobonificacion(bonificacions: BonificacionsInterface) {
      this.router.navigate([`/pages/pagobonificacions/bonificacion/${bonificacions.idbonificacion}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(BonificacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(bonificacions: BonificacionsInterface) {
      const disposable = this.dialogService.addDialog(BonificacionsEditModalComponent, bonificacions)
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
          this.service.remove(item.idbonificacion)
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
            (data: BonificacionsResponseInterface) =>  {
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
