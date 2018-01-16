export interface VehiculoreparandosInterface {
   idvehiculoreparando?: number;
   fechaIngresa?: string;
   horaIngresa?: string;
   fechaSalida?: string;
   horaSalida?: string;
   fechaEstimada?: string;
   horaEstimada?: string;
   inventario?: string;
   motivo?: string;
   estado_idestado?: number;
   enviotaller_idenviotaller?: number;
   taller_idtaller?: number;
   mecanico_idmecanico?: number;
   permisotaxiasignado_idpermisotaxiasignado?: number;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
