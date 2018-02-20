import { ChofersBitacoraService } from './components/chofer-bitacora/chofer.service';
import { ChofersBitacoraComponent } from './components/chofer-bitacora/chofer-bitacora.component';
import { PermisotaxisBitacoraService } from './components/permisotaxis-bitacora/permisotaxis.service';
import { PermisotaxisBitacoraComponent } from './components/permisotaxis-bitacora/permisotaxis-bitacora.component';


import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './reportes.routing';
import { ReportesComponent } from './reportes.component';
import { ReportesService } from './components/reportes-table/reportes.service';
import { ReportesTableComponent } from './components/reportes-table/reportes-table.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })
  ],
  declarations: [
    ReportesComponent,
    ReportesTableComponent,
    PermisotaxisBitacoraComponent,
    ChofersBitacoraComponent
  ],
  entryComponents: [
  ],
  providers: [
    ReportesService,
    PermisotaxisBitacoraService,
    ChofersBitacoraService
  ]
})
export class ReportesModule {
}
