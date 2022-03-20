import css from './ListadoViajes.module.css'
import ListadoGenerico from './../utils/ListadoGenerico'
import { viajeDTO } from './viajes.model'
import ViajeIndividual from './ViajeIndividual'

export default function ListadoPeliculas(props: listadoViajesProps) {
    return (
        <ListadoGenerico listado={props.viajes}>
            <div className={css.div}>
                {props.viajes?.map(viaje =>
                    <ViajeIndividual viaje={viaje}
                        key={viaje.id}
                    />)}
            </div>
        </ListadoGenerico>

    )
}

interface listadoViajesProps {
    viajes?: viajeDTO[]
}