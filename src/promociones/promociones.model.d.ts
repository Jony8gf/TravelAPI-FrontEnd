export interface promocionCreacionDTO {
    nombre: string;
    fechaDesde?: Date;
    fechaHasta?: Date;
    porcentajeDescuento: number;
}

export interface promocionDTO {
    id: number;
    nombre: string;
    fechaDesde: Date;
    fechaHasta: Date;
    porcentajeDescuento: number;
}