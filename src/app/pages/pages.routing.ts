import { Routes, RouterModule, CanActivate } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../shared/auth-guard.service';
export const routes: Routes = [
{
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
},
{
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
},
{
    path: 'forgot',
    loadChildren: 'app/pages/forgot/forgot.module#ForgotModule'
},
{
    path: 'change-password',
    loadChildren: 'app/pages/change-password/change-password.module#ChangePasswordModule', 
    canActivate: [AuthGuard]
},
{
    path: 'pages',
    component: Pages,
    children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'unauthorized', loadChildren: './unauthorized/unauthorized.module#UnauthorizedModule'},
    { path: 'bonificacions', loadChildren: './bonificacions/bonificacions.module#BonificacionsModule',
        canActivateChild: [AuthGuard] },
    { path: 'chofers', loadChildren: './chofers/chofers.module#ChofersModule',
        canActivateChild: [AuthGuard] },
    { path: 'conceptos', loadChildren: './conceptos/conceptos.module#ConceptosModule',
        canActivateChild: [AuthGuard] },
    { path: 'corralons', loadChildren: './corralons/corralons.module#CorralonsModule',
        canActivateChild: [AuthGuard] },
    { path: 'egresoconceptos', loadChildren: './egresoconceptos/egresoconceptos.module#EgresoconceptosModule',
        canActivateChild: [AuthGuard] },
    { path: 'enviotallers', loadChildren: './enviotallers/enviotallers.module#EnviotallersModule',
        canActivateChild: [AuthGuard] },
    { path: 'estados', loadChildren: './estados/estados.module#EstadosModule',
        canActivateChild: [AuthGuard] },
    { path: 'liquidacions', loadChildren: './liquidacions/liquidacions.module#LiquidacionsModule',
        canActivateChild: [AuthGuard] },
    { path: 'mecanicos', loadChildren: './mecanicos/mecanicos.module#MecanicosModule',
        canActivateChild: [AuthGuard] },
    { path: 'ordens', loadChildren: './ordens/ordens.module#OrdensModule',
        canActivateChild: [AuthGuard] },
    { path: 'orden_has_refaccions', loadChildren: './orden_has_refaccions/orden_has_refaccions.module#Orden_has_refaccionsModule',
        canActivateChild: [AuthGuard] },
    { path: 'pagos', loadChildren: './pagos/pagos.module#PagosModule',
        canActivateChild: [AuthGuard] },
    { path: 'pagobonificacions', loadChildren: './pagobonificacions/pagobonificacions.module#PagobonificacionsModule',
        canActivateChild: [AuthGuard] },
    { path: 'pagofianzas', loadChildren: './pagofianzas/pagofianzas.module#PagofianzasModule',
        canActivateChild: [AuthGuard] },
    { path: 'pagoliquidacions', loadChildren: './pagoliquidacions/pagoliquidacions.module#PagoliquidacionsModule',
        canActivateChild: [AuthGuard] },
    { path: 'permisotaxis', loadChildren: './permisotaxis/permisotaxis.module#PermisotaxisModule',
        canActivateChild: [AuthGuard] },
    { path: 'permisotaxiasignados', loadChildren: './permisotaxiasignados/permisotaxiasignados.module#PermisotaxiasignadosModule',
        canActivateChild: [AuthGuard] },
    { path: 'personas', loadChildren: './personas/personas.module#PersonasModule',
        canActivateChild: [AuthGuard] },
    { path: 'refaccions', loadChildren: './refaccions/refaccions.module#RefaccionsModule',
        canActivateChild: [AuthGuard] },
    { path: 'tallers', loadChildren: './tallers/tallers.module#TallersModule',
        canActivateChild: [AuthGuard] },
    { path: 'vehiculos', loadChildren: './vehiculos/vehiculos.module#VehiculosModule',
        canActivateChild: [AuthGuard] },
    { path: 'vehiculoreparandos', loadChildren: './vehiculoreparandos/vehiculoreparandos.module#VehiculoreparandosModule',
        canActivateChild: [AuthGuard] },
    { path: 'si_modulos', loadChildren: './si_modulos/si_modulos.module#Si_modulosModule',
        canActivateChild: [AuthGuard] },
    { path: 'si_permisos', loadChildren: './si_permisos/si_permisos.module#Si_permisosModule',
        canActivateChild: [AuthGuard] },
    { path: 'si_rols', loadChildren: './si_rols/si_rols.module#Si_rolsModule',
        canActivateChild: [AuthGuard] },
    { path: 'si_users', loadChildren: './si_users/si_users.module#Si_usersModule',
        canActivateChild: [AuthGuard] },
    { path: 'si_reportes', loadChildren: './si_reportes/si_reportes.module#Si_reportesModule',
        canActivateChild: [AuthGuard] },
    ]
}
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
