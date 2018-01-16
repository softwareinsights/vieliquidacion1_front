import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './pagobonificacions.routing';
import { PagobonificacionsComponent } from './pagobonificacions.component';
import { PagobonificacionsService } from './components/pagobonificacions-table/pagobonificacions.service';
import { PagobonificacionsTableComponent } from './components/pagobonificacions-table/pagobonificacions-table.component';

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
    PagobonificacionsComponent,
    PagobonificacionsTableComponent,
  ],
  entryComponents: [
  ],
  providers: [
    PagobonificacionsService
  ]
})
export class PagobonificacionsModule {
}
