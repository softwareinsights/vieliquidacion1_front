import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {EnviotallersComponent } from './enviotallers.component';
import {EnviotallersTableComponent } from './components/enviotallers-table/enviotallers-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EnviotallersComponent,
    children: [
      { path: 'enviotallers-table', component: EnviotallersTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
