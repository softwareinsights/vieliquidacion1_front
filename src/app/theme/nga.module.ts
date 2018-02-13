import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { AppTranslationModule } from '../app.translation.module';

import {
BaThemeConfig
} from './theme.config';

import {
BaThemeConfigProvider
} from './theme.configProvider';

import {
BaAmChart,
BaBackTop,
BaCard,
BaChartistChart,
BaCheckbox,
BaContentTop,
BaFullCalendar,
BaMenuItem,
BaMenu,
BaMsgCenter,
BaMultiCheckbox,
BaPageTop,
BaPictureUploader,
BaSidebar,
BaFileUploader
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
BaScrollPosition,
BaSlimScroll,
BaThemeRun
} from './directives';

import {
BaAppPicturePipe,
BaKameleonPicturePipe,
BaProfilePicturePipe,

Chofer_chofer_idchoferFilterPipe,
Estado_estado_idestadoFilterPipe,
ConceptoFilterPipe,
Persona_choferFilterPipe,
Estado_estado_idestado_fianzaFilterPipe,
NombreFilterPipe,
MotivoFilterPipe,
CorralonNombreFilterPipe,
Permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignadoFilterPipe,
FechaFilterPipe,
Taller_taller_idtallerFilterPipe,
Concepto_concepto_idconceptoFilterPipe,
Persona_persona_idpersonaFilterPipe,
DescripcionFilterPipe,
Vehiculoreparando_vehiculoreparando_idvehiculoreparandoFilterPipe,
Refaccion_refaccion_idrefaccionFilterPipe,
NotaFilterPipe,
NumeroFilterPipe,
Persona_propietarioFilterPipe,
Vehiculo_vehiculo_idvehiculoFilterPipe,
Permisotaxi_permisotaxi_idpermisotaxiFilterPipe,
RfcFilterPipe,
DomicilioFilterPipe,
Modulo_si_modulo_idsi_moduloFilterPipe,
UsuarioFilterPipe,
EmailFilterPipe,
Rol_si_rol_idsi_rolFilterPipe,
DireccionFilterPipe,
MarcaFilterPipe,
ModeloFilterPipe,
PlacaFilterPipe,
ColorFilterPipe,
FechaIngresaFilterPipe,
FechaSalidaFilterPipe,
InventarioFilterPipe,
Enviotaller_enviotaller_idenviotallerFilterPipe,
Mecanico_mecanico_idmecanicoFilterPipe,
} from './pipes';

import {
BaImageLoaderService,
BaMenuService,
BaThemePreloader,
BaThemeSpinner
} from './services';

import {
EmailValidator,
EqualPasswordsValidator
} from './validators';

const NGA_COMPONENTS = [
BaAmChart,
BaBackTop,
BaCard,
BaChartistChart,
BaCheckbox,
BaContentTop,
BaFullCalendar,
BaMenuItem,
BaMenu,
BaMsgCenter,
BaMultiCheckbox,
BaPageTop,
BaPictureUploader,
BaSidebar,
BaFileUploader
];

const NGA_DIRECTIVES = [
BaScrollPosition,
BaSlimScroll,
BaThemeRun,
BaCardBlur
];

const NGA_PIPES = [
BaAppPicturePipe,
BaKameleonPicturePipe,
BaProfilePicturePipe,

Chofer_chofer_idchoferFilterPipe,
Estado_estado_idestadoFilterPipe,
ConceptoFilterPipe,
Persona_choferFilterPipe,
Estado_estado_idestado_fianzaFilterPipe,
NombreFilterPipe,
MotivoFilterPipe,
CorralonNombreFilterPipe,
Permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignadoFilterPipe,
FechaFilterPipe,
Taller_taller_idtallerFilterPipe,
Concepto_concepto_idconceptoFilterPipe,
Persona_persona_idpersonaFilterPipe,
DescripcionFilterPipe,
Vehiculoreparando_vehiculoreparando_idvehiculoreparandoFilterPipe,
Refaccion_refaccion_idrefaccionFilterPipe,
NotaFilterPipe,
NumeroFilterPipe,
Persona_propietarioFilterPipe,
Vehiculo_vehiculo_idvehiculoFilterPipe,
Permisotaxi_permisotaxi_idpermisotaxiFilterPipe,
RfcFilterPipe,
DomicilioFilterPipe,
Modulo_si_modulo_idsi_moduloFilterPipe,
UsuarioFilterPipe,
EmailFilterPipe,
Rol_si_rol_idsi_rolFilterPipe,
DireccionFilterPipe,
MarcaFilterPipe,
ModeloFilterPipe,
PlacaFilterPipe,
ColorFilterPipe,
FechaIngresaFilterPipe,
FechaSalidaFilterPipe,
InventarioFilterPipe,
Enviotaller_enviotaller_idenviotallerFilterPipe,
Mecanico_mecanico_idmecanicoFilterPipe,
];

const NGA_SERVICES = [
BaImageLoaderService,
BaThemePreloader,
BaThemeSpinner,
BaMenuService
];

const NGA_VALIDATORS = [
EmailValidator,
EqualPasswordsValidator
];

@NgModule({
declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
],
imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgUploaderModule
],
exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
]
})
export class NgaModule {
static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
    ngModule: NgaModule,
    providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
    ],
    };
}
}
