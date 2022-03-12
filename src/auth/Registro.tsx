import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlCuentas } from "utils/endpoints";
import MostrarErrores from "utils/MostarErrores";
import AutenticationContext from "./AutenticationContext";
import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormulartioAuth";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";

export default function Registro() {
    
    const history = useHistory();
    const{actualizar} = useContext(AutenticationContext);
    const [errores, setErrores] = useState<string[]>([]);

    async function Registrar(credenciales:credencialesUsuario) {
        
        try{
            const respuesta = await axios.post<respuestaAutenticacion>(`${urlCuentas}/crear`, credenciales)
            guardarTokenLocalStorage(respuesta.data);
            actualizar(obtenerClaims());
            setErrores([]);
            history.push("/");
        }catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h3>Registro</h3>
            <MostrarErrores errores={errores} />
            <FormularioAuth  modelo={{email: '', password: ''}} type="logout" 
                onSubmit={async valores => await Registrar(valores)}
                />
        
        </>
        
    )
}