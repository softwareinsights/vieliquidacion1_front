import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {VehiculosComponent } from './vehiculos.component';
import {VehiculosTableComponent } from './components/vehiculos-table/vehiculos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: VehiculosComponent,
    children: [
      { path: 'vehiculos-table', component: VehiculosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
