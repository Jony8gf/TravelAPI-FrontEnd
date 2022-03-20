import axios, { AxiosResponse } from "axios";
import { promocionDTO } from "promociones/promociones.model";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { tipoActividadDTO } from "tipoActividad/tipoactividad.model";
import Cargando from "utils/Cargando";
import { urlViajes } from "utils/endpoints";
import { convertirViajeAFormData } from "utils/FormDataUtils";
import MostrarErrores from "utils/MostarErrores";
import FormularioViajes from "./FormularioViajes";
import { viajeCreacionDTO, viajePostGetDTO } from "./viajes.model";

export default function CrearViajes() {

    const [tiposActvidadNoSeleccionados, setTiposActvidadNoSeleccionados] = useState<tipoActividadDTO[]>([]);
    const [promocionesNoSeleccionados, setPromocionesNoSeleccionados] = useState<promocionDTO[]>([]);
    const [cargado, setCargado] = useState(false);
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlViajes}/postget`)
        .then((respuesta: AxiosResponse<viajePostGetDTO>) => {
            setTiposActvidadNoSeleccionados(respuesta.data.tipoActividades);
            setPromocionesNoSeleccionados(respuesta.data.promociones);
            setCargado(true)
        })
    }, [])

    async function crearViaje(viaje: viajeCreacionDTO) {
        try{
            const formData = convertirViajeAFormData(viaje);
            await axios({
                method: 'post',
                url: urlViajes,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((respuesta: AxiosResponse<number>) => {
                history.push(`/viajes/${respuesta.data}`);
            });
            
        }
        catch (error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Crear Viaje</h3>
            <MostrarErrores errores={errores} />
            {cargado ?  <FormularioViajes
            promocionesNoSeleccionados={promocionesNoSeleccionados}
            promocionesSeleccionados={[]}
            tiposActividadesNoSeleccionados={tiposActvidadNoSeleccionados}
            tiposActividadesSeleccionados={[]}
                modelo={{ lugar: '', pais: '', descripcion:'' , precio: 1, fotoURL:''}}
                onSubmit={async valores => crearViaje(valores)}
            /> : <Cargando />}
            
        </>
    )
}