import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EgresoconceptosInterface } from './egresoconceptos.interface';
import { EgresoconceptosResponseInterface } from './egresoconceptos-response.interface';
import { Component, OnInit } from '@angular/core';
import { EgresoconceptosService } from './egresoconceptos.service';
import { EgresoconceptosAddModalComponent } from './egresoconceptos-add-modal/egresoconceptos-add-modal.component';
import { EgresoconceptosEditModalComponent } from './egresoconceptos-edit-modal/egresoconceptos-edit-modal.component';

@Component({
selector: 'egresoconceptos-table',
templateUrl: './egresoconceptos-table.html',
styleUrls: ['./egresoconceptos-table.scss'],
})
export class EgresoconceptosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idegresoconcepto';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: EgresoconceptosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idconcepto'] !== undefined) {
          const idconcepto = +params['idconcepto'];
          this.findByIdConcepto(idconcepto);
          this.backpage = true;
        }
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
    private findByIdConcepto(id: number): void {
      this.service
        .findByIdConcepto(id)
        .subscribe(
            (data: EgresoconceptosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdTaller(id: number): void {
      this.service
        .findByIdTaller(id)
        .subscribe(
            (data: EgresoconceptosResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(EgresoconceptosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(egresoconceptos: EgresoconceptosInterface) {
      const disposable = this.dialogService.addDialog(EgresoconceptosEditModalComponent, egresoconceptos)
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
          this.service.remove(item.idegresoconcepto)
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
            (data: EgresoconceptosResponseInterface) =>  {
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
