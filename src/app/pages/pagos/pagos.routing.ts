import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PagosComponent } from './pagos.component';
import {PagosTableComponent } from './components/pagos-table/pagos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PagosComponent,
    children: [
      { path: 'pagos-table', component: PagosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
