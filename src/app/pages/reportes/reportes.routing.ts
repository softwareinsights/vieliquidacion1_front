import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ReportesComponent } from './reportes.component';
import {ReportesTableComponent } from './components/reportes-table/reportes-table.component';
ReportesTableComponent
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    children: [
      { path: 'reportes-table', component: ReportesTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
