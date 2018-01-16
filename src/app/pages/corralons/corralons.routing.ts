import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CorralonsComponent } from './corralons.component';
import {CorralonsTableComponent } from './components/corralons-table/corralons-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CorralonsComponent,
    children: [
      { path: 'corralons-table', component: CorralonsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
