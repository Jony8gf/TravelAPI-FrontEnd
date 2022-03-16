import { promocionCreacionDTO } from "promociones/promociones.model";

export function convertirPeliculaAFormData(promocion: promocionCreacionDTO): FormData{
    
    const formData = new FormData();
    console.log(formData);
    formData.append('nombre', promocion.nombre);

    formData.append('porcentajeDescuento', String(promocion.porcentajeDescuento));


    if(promocion.fechaDesde){
        formData.append('fechaDesde', formatearFecha(promocion.fechaDesde));
    }

    if(promocion.fechaHasta){
        formData.append('fechaHasta', formatearFecha(promocion.fechaHasta));
    }
    
    return formData;
}

export function formatearFecha(date: Date){
    date = new Date(date);
    const formato = new Intl.DateTimeFormat(
        "en", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }
    );

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = formato.formatToParts(date);

    return `${year}-${month}-${day}`
}