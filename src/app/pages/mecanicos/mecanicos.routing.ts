import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {MecanicosComponent } from './mecanicos.component';
import {MecanicosTableComponent } from './components/mecanicos-table/mecanicos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MecanicosComponent,
    children: [
      { path: 'mecanicos-table', component: MecanicosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
