import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxisBitacoraResponseInterface } from './permisotaxis-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxisBitacoraService } from './permisotaxis.service';

@Component({
selector: 'permisotaxis-bitacora',
templateUrl: './permisotaxis-bitacora.html',
styleUrls: ['./permisotaxis-bitacora.scss'],
})
export class PermisotaxisBitacoraComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisotaxi';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: PermisotaxisBitacoraService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idpermisotaxi'] !== undefined) {
          const idpermisotaxi = +params['idpermisotaxi'];
          this.findByIdPermisoTaxi(idpermisotaxi);
          this.backpage = true;
        }

      });
    }
    backPage() {
        window.history.back();
    }
    private findByIdPermisoTaxi(id: number): void {
      this.service
        .findByIdPermisoTaxi(id)
        .subscribe(
            (data: PermisotaxisBitacoraResponseInterface) => {
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
