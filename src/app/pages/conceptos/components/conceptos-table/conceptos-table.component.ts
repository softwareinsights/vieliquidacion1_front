import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ConceptosInterface } from './conceptos.interface';
import { ConceptosResponseInterface } from './conceptos-response.interface';
import { Component, OnInit } from '@angular/core';
import { ConceptosService } from './conceptos.service';
import { ConceptosAddModalComponent } from './conceptos-add-modal/conceptos-add-modal.component';
import { ConceptosEditModalComponent } from './conceptos-edit-modal/conceptos-edit-modal.component';
@Component({
selector: 'conceptos-table',
templateUrl: './conceptos-table.html',
styleUrls: ['./conceptos-table.scss'],
})
export class ConceptosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idconcepto';
    sortOrder = 'asc';
    constructor(
      private service: ConceptosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ConceptosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(conceptos: ConceptosInterface) {
      const disposable = this.dialogService.addDialog(ConceptosEditModalComponent, conceptos)
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
          this.service.remove(item.idconcepto)
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
            (data: ConceptosResponseInterface) =>  {
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
