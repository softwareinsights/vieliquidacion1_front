import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PagoliquidacionsComponent } from './pagoliquidacions.component';
import {PagoliquidacionsTableComponent } from './components/pagoliquidacions-table/pagoliquidacions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PagoliquidacionsComponent,
    children: [
      { path: 'pagoliquidacions-table', component: PagoliquidacionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
