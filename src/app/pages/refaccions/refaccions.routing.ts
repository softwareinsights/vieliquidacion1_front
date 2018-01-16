import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {RefaccionsComponent } from './refaccions.component';
import {RefaccionsTableComponent } from './components/refaccions-table/refaccions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: RefaccionsComponent,
    children: [
      { path: 'refaccions-table', component: RefaccionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
