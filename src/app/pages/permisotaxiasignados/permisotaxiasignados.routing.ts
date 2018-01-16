import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PermisotaxiasignadosComponent } from './permisotaxiasignados.component';
import {PermisotaxiasignadosTableComponent } from './components/permisotaxiasignados-table/permisotaxiasignados-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PermisotaxiasignadosComponent,
    children: [
      { path: 'permisotaxiasignados-table', component: PermisotaxiasignadosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
