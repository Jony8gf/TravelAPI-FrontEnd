import { urlTipoActividad } from "utils/endpoints";
import IndiceEntidad from "utils/IndiceEntidad";
import { tipoActividadDTO } from "./tipoactividad.model";

export default function IndiceTipoActividad() {

    return (
        <>

                <IndiceEntidad<tipoActividadDTO> 
                url={urlTipoActividad}
                urlCrear="tipoActividad/crear"
                titulo="Tipo Actividad"
                nombreEntidad="Tipo Actividad">

                    {(actividades, botones) => 
                        <>
                            <thead>
                            <th></th>
                            <th>Nombre</th>
                        </thead>
                        <tbody>
                            {actividades?.map(actividad => 
                                <tr key={actividad.id}>
                                    <td>
                                       {botones(`tipoActividad/editar/${actividad.id}`, actividad.id)} 
                                    </td>
                                    <td>
                                        {actividad.nombre}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        </>
                    }
                    
                </IndiceEntidad>
        </>

    )
}