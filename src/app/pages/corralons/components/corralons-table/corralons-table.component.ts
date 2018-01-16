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
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
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
