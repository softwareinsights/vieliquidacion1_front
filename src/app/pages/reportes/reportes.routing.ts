import { ChofersBitacoraComponent } from './components/chofer-bitacora/chofer-bitacora.component';
import { PermisotaxisBitacoraComponent } from './components/permisotaxis-bitacora/permisotaxis-bitacora.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ReportesComponent } from './reportes.component';
import { ReportesTableComponent } from './components/reportes-table/reportes-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    children: [
      { path: 'reportes-table', component: ReportesTableComponent },
      { path: 'bitacora-pagos-permiso/:idpermisotaxi', component: PermisotaxisBitacoraComponent },
      { path: 'bitacora-pagos-chofer/:idchofer', component: ChofersBitacoraComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
