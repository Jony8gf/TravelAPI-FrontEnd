import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Cargando from "utils/Cargando";
import { urlViajes } from "utils/endpoints";
import { convertirViajeAFormData } from "utils/FormDataUtils";
import MostrarErrores from "utils/MostarErrores";
import FormularioViajes from "./FormularioViajes";
import { viajeCreacionDTO, viajePutGetDTO } from "./viajes.model";

export default function EditarViajes() {


    const [viajes, setViajes] = useState<viajeCreacionDTO>();
    const [viajePutGet, setViajePutGet] = useState<viajePutGetDTO>();
    const {id}: any = useParams();

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlViajes}/PutGet/${id}`)
        .then((respuesta: AxiosResponse<viajePutGetDTO>) => {
            const modelo: viajeCreacionDTO = {
                pais: respuesta.data.viaje.pais,
                lugar: respuesta.data.viaje.lugar,
                descripcion: respuesta.data.viaje.descripcion,
                fotoURL: respuesta.data.viaje.foto,
                precio: respuesta.data.viaje.precio,
            };
            setViajes(modelo);
            setViajePutGet(respuesta.data);
        })
    }, [id])

    async function editarViaje(viajeEditar:viajeCreacionDTO) {
        try{
            const formData = convertirViajeAFormData(viajeEditar);
            await axios({
                method: 'put',
                url: `${urlViajes}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((respuesta: AxiosResponse<number>) => {
                history.push(`/viajes/filtrar`);
            });
        }catch(error){
            setErrores(error.response.data);
        }
    }

    return (

        <>
            <h3>Editar Película</h3>
            <MostrarErrores errores={errores} />
            {viajes && viajePutGet ? <FormularioViajes
            promocionesSeleccionados={viajePutGet!.promocionesSeleccionados}
            promocionesNoSeleccionados={viajePutGet!.promocionesNoSeleccionados}
            tiposActividadesSeleccionados={viajePutGet!.tipoActividadesSeleccionados}
            tiposActividadesNoSeleccionados={viajePutGet!.tipoActividadesNoSeleccionados}
                modelo={viajes}
                onSubmit={async valores => await editarViaje(valores)}
            /> : <Cargando />}
        </>

    )
}