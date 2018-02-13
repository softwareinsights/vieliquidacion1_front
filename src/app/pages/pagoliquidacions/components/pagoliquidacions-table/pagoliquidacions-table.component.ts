import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PagoliquidacionsInterface } from './pagoliquidacions.interface';
import { PagoliquidacionsResponseInterface } from './pagoliquidacions-response.interface';
import { Component, OnInit } from '@angular/core';
import { PagoliquidacionsService } from './pagoliquidacions.service';
import { PagoliquidacionsAddModalComponent } from './pagoliquidacions-add-modal/pagoliquidacions-add-modal.component';
import { PagoliquidacionsEditModalComponent } from './pagoliquidacions-edit-modal/pagoliquidacions-edit-modal.component';

@Component({
selector: 'pagoliquidacions-table',
templateUrl: './pagoliquidacions-table.html',
styleUrls: ['./pagoliquidacions-table.scss'],
})
export class PagoliquidacionsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpagoliquidacion';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: PagoliquidacionsService, 
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
        if (params['idpago'] !== undefined) {
          const idpago = +params['idpago'];
          this.findByIdPago(idpago);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdChofer(id: number): void {
      this.service
        .findByIdChofer(id)
        .subscribe(
            (data: PagoliquidacionsResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdPago(id: number): void {
      this.service
        .findByIdPago(id)
        .subscribe(
            (data: PagoliquidacionsResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(PagoliquidacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(pagoliquidacions: PagoliquidacionsInterface) {
      const disposable = this.dialogService.addDialog(PagoliquidacionsEditModalComponent, pagoliquidacions)
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
          this.service.remove(item.idpagoliquidacion)
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
            (data: PagoliquidacionsResponseInterface) =>  {
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
