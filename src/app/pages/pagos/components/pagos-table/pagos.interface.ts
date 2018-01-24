export interface PagosInterface {
   idpago?: number;
   cantidadRecibida?: number;
   cambio?: number;
   kilometraje?: number;
   fecha?: string;
   hora?: string;
   nota?: string;
   cantPagada?: number;
   estado_idestado?: number;
   descripcion?: string;
   folio?: string;
   liquidacion?: number;
   foliofianza?: string;
   fianza?: number;
   chofer_idchofer?: number;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
