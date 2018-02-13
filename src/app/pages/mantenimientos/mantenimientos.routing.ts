import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {MantenimientosComponent } from './mantenimientos.component';
import {MantenimientosTableComponent } from './components/mantenimientos-table/mantenimientos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MantenimientosComponent,
    children: [
      { path: 'mantenimientos-table', component: MantenimientosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
