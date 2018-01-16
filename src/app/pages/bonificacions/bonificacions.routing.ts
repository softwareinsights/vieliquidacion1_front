import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {BonificacionsComponent } from './bonificacions.component';
import {BonificacionsTableComponent } from './components/bonificacions-table/bonificacions-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: BonificacionsComponent,
    children: [
      { path: 'bonificacions-table', component: BonificacionsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
