import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {LiquidacionsComponent } from './liquidacions.component';
import {LiquidacionsTableComponent } from './components/liquidacions-table/liquidacions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LiquidacionsComponent,
    children: [
      { path: 'liquidacions-table', component: LiquidacionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
