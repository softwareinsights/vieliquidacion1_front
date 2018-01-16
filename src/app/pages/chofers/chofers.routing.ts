import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ChofersComponent } from './chofers.component';
import {ChofersTableComponent } from './components/chofers-table/chofers-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ChofersComponent,
    children: [
      { path: 'chofers-table', component: ChofersTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
