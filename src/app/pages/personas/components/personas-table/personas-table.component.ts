import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PersonasInterface } from './personas.interface';
import { PersonasResponseInterface } from './personas-response.interface';
import { Component, OnInit } from '@angular/core';
import { PersonasService } from './personas.service';
import { PersonasAddModalComponent } from './personas-add-modal/personas-add-modal.component';
import { PersonasEditModalComponent } from './personas-edit-modal/personas-edit-modal.component';
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
    constructor(
      private service: PersonasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
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
