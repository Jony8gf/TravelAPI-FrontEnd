import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlTipoActividad } from "utils/endpoints";
import MostrarErrores from "utils/MostarErrores";
import FormularioTipoActividad from "./FormularioTipoActividad";
import { tipoActividadCreacionDTO } from "./tipoactividad.model";

export default function CrearTipoActividad() {
    
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crearGenero(tipoActividad: tipoActividadCreacionDTO) {
        try{
            await axios.post(urlTipoActividad, tipoActividad);
            history.push('/tipoActividad');
        }
        catch (error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Crear Tipo de Actividad</h3>
            <MostrarErrores errores={errores}/>
            <FormularioTipoActividad modelo={{nombre: ''}} 
                 onSubmit={async valores => {
                    await crearGenero(valores);
                 }}
            />
        </>
    )
}