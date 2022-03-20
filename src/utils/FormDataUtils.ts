import { promocionCreacionDTO } from "promociones/promociones.model";
import { viajeCreacionDTO } from "viajes/viajes.model";

export function convertirPromocionAFormData(promocion: promocionCreacionDTO): FormData{
    
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


export function convertirViajeAFormData(viaje: viajeCreacionDTO): FormData{
    
    const formData = new FormData();
    formData.append('pais', viaje.pais);
    formData.append('lugar', viaje.lugar);
    formData.append('precio', viaje.precio.toString());

    if(viaje.descripcion){
        formData.append('descripcion', viaje.descripcion);
    }

    if(viaje.foto){
        formData.append('foto', viaje.foto);
    }

    if(viaje.latitud){
        formData.append('latitud', viaje.latitud.toString());
    }

    if(viaje.longitud){
        formData.append('longitud', viaje.longitud.toString());
    }


    formData.append("promocionesIds", JSON.stringify(viaje.promocionesIds));
    formData.append("tipoActividadesIds", JSON.stringify(viaje.tipoActividadesIds));

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