import { ChofersBitacoraResponseInterface } from './chofer-response.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ChofersBitacoraService } from './chofer.service';

@Component({
selector: 'chofer-bitacora',
templateUrl: './chofer-bitacora.html',
styleUrls: ['./chofer-bitacora.scss'],
})
export class ChofersBitacoraComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idchofer';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: ChofersBitacoraService, 
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

      });
    }
    backPage() {
        window.history.back();
    }
    private findByIdChofer(id: number): void {
      this.service
        .findByIdChofer(id)
        .subscribe(
            (data: ChofersBitacoraResponseInterface) => {
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
