export interface viajeDTO{
    id: number;
    pais: string;
    lugar: string;
    descripcion: string;
    foto: string;
    precio: number;
    latitud?: number;
    longitud?: number;
    promociones: promocionDTO[];
    tipoActividades: tipoActividadDTO[];
}

export interface viajeCreacionDTO{
    pais: string;
    lugar: string;
    descripcion: string;
    foto?: File;
    fotoURL: string;
    precio: number;
    latitud?: number;
    longitud?: number;
    promocionesIds?: number[];
    tipoActividadesIds?: number[];
}

export interface viajePostGetDTO{
    promociones: promocionDTO[];
    tipoActividades: tipoActividadDTO[];
}

export interface viajePutGetDTO{
    viaje: viajeDTO;
    promocionesSeleccionados: promocionDTO[];
    promocionesNoSeleccionados: promocionDTO[];
    tipoActividadesSeleccionados: tipoActividadDTO[];
    tipoActividadesNoSeleccionados: tipoActividadDTO[];
}

export interface viajeDescuentoDTO{
    id: number;
    pais: string;
    lugar: string;
    descripcion: string;
    foto: string;
    precio: number;
    precioDescuento: number;
    latitud?: number;
    longitud?: number;
}