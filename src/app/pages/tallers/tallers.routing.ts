import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TallersComponent } from './tallers.component';
import {TallersTableComponent } from './components/tallers-table/tallers-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TallersComponent,
    children: [
      { path: 'tallers-table', component: TallersTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
