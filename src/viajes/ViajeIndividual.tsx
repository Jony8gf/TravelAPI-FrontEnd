import css from './ViajeIndividual.module.css'
import { Link } from "react-router-dom";
import Button from "utils/Button";
import axios from "axios";
import { urlViajes } from "utils/endpoints";
import { useContext } from "react";
import AlertaConext from "utils/AlertaConext";
import confirmar from "utils/Confirmar";
import Autorizado from "auth/Autorizado";
import { viajeDTO } from "./viajes.model";

export default function ViajeIndividual(props: viajeIndividualProps) {

    const construirLink = () => `/viajes/${props.viaje.id}`
    const alerta = useContext(AlertaConext);

    async function borrarPelicula(id: number) {
        try {
            await axios.delete(urlViajes + "/" + id)
                .then(() => {
                    alerta();
                })
        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (
        <div className={css.div}>
            <Link to={construirLink()}>
                <img src={props.viaje.foto} alt="Poster" />
            </Link>
            <p>
                <Link to={construirLink()}>{props.viaje.lugar}</Link>
            </p>
            <Autorizado
                role='admin'
                autorizado={
                    <div>
                        <Link style={{ marginRight: '1rem' }}
                            className="btn btn-info"
                            to={`/viajes/editar/${props.viaje.id}`}
                        >Editar</Link>
                        <Button className="btn btn-danger"
                            onClick={() => confirmar(() => borrarPelicula(props.viaje.id))} >Borrar</Button>
                    </div>
                } />

        </div>
    )
}

interface viajeIndividualProps {
    viaje: viajeDTO;
}