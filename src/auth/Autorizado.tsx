import { ReactElement, useContext, useEffect, useState } from "react";
import AutenticationContext from "./AutenticationContext";

export default function Autorizado(props: autorizadoProps){
    
    const[estaAutorizado, setEstaAutorizado] = useState(false);
    const {claims} = useContext(AutenticationContext);

    useEffect(() => {
        if(props.role){
            const indice = claims.findIndex(claim => claim.nombre === 'role' && claim.valor === props.role)
            setEstaAutorizado(indice > -1);
        }else{
            setEstaAutorizado(claims.length > 0)
        }
    }, [claims])

    return(
        <>
            {estaAutorizado ? props.autorizado : props.noAutorizado}
        </>
    )
}

interface autorizadoProps{
    autorizado: ReactElement;
    noAutorizado?: ReactElement;
    role?: string;
}