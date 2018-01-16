import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PagofianzasComponent } from './pagofianzas.component';
import {PagofianzasTableComponent } from './components/pagofianzas-table/pagofianzas-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PagofianzasComponent,
    children: [
      { path: 'pagofianzas-table', component: PagofianzasTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
