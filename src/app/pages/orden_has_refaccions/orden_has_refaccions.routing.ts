import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {Orden_has_refaccionsComponent } from './orden_has_refaccions.component';
import {Orden_has_refaccionsTableComponent } from './components/orden_has_refaccions-table/orden_has_refaccions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Orden_has_refaccionsComponent,
    children: [
      { path: 'orden_has_refaccions-table', component: Orden_has_refaccionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
