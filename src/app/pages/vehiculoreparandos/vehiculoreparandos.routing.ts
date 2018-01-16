import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {VehiculoreparandosComponent } from './vehiculoreparandos.component';
import {VehiculoreparandosTableComponent } from './components/vehiculoreparandos-table/vehiculoreparandos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: VehiculoreparandosComponent,
    children: [
      { path: 'vehiculoreparandos-table', component: VehiculoreparandosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
