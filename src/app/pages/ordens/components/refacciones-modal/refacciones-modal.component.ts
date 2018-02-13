import { RefaccionsInterface } from './../../../refaccions/components/refaccions-table/refaccions.interface';
import { RefaccionsService } from './../../../refaccions/components/refaccions-table/refaccions.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'ng2-bootstrap-modal/dist/dialog.component';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';

@Component({
  selector: 'app-refacciones-modal',
  templateUrl: './refacciones-modal.component.html',
  styleUrls: ['./refacciones-modal.component.scss'],
  providers: [
    RefaccionsService
  ]
})
export class RefaccionesModalComponent extends DialogComponent<RefaccionsInterface, any> implements OnInit {
  refacciones: RefaccionsInterface[];
  constructor(
    private refaccionesService: RefaccionsService,
    dialogService: DialogService
  ) { 
    super(dialogService);
  }

  ngOnInit() {
    this.getAllRefacciones();
  }
  confirm( refaccion ) {
    this.result = refaccion;
    this.close();
  }
  getAllRefacciones() {
    this.refaccionesService.all()
      .subscribe( res =>
        this.refacciones = res.success
          ? res.result
          : null)
  }


}
