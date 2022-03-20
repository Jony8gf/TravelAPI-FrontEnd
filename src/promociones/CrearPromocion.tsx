import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlPromocion } from "utils/endpoints";
import MostrarErrores from "utils/MostarErrores";
import FormularioPromociones from "./FormularioPromociones";
import { promocionCreacionDTO } from "./promociones.model";


export default function CrearPromocion() {
    
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crearPromocion(promocion: promocionCreacionDTO) {
        console.log(promocion)
        try{
            console.log(promocion);
            await axios.post(urlPromocion, promocion);
            history.push('/promociones');
        }
        catch (error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Crear Promocion</h3>
            <MostrarErrores errores={errores}/>
            <FormularioPromociones modelo={{nombre: '', porcentajeDescuento: 1}} 
                 onSubmit={async valores => {
                    await crearPromocion(valores);
                 }}
            />
        </>
    )
}