
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PermisotaxisComponent } from './permisotaxis.component';
import { PermisotaxisTableComponent } from './components/permisotaxis-table/permisotaxis-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PermisotaxisTableComponent,
    children: [
      { path: 'permisotaxi-table', component: PermisotaxisComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
