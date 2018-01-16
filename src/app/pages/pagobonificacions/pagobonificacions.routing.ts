import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PagobonificacionsComponent } from './pagobonificacions.component';
import {PagobonificacionsTableComponent } from './components/pagobonificacions-table/pagobonificacions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PagobonificacionsComponent,
    children: [
      { path: 'pagobonificacions-table', component: PagobonificacionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
