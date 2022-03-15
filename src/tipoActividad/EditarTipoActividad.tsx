import EditarEntidad from "utils/EditarEntidad";
import { urlTipoActividad } from "utils/endpoints";
import FormularioTipoActividad from "./FormularioTipoActividad";
import { tipoActividadCreacionDTO, tipoActividadDTO } from "./tipoactividad.model";


export default function EditarTipoActividad() {

    return (
        <>
            <EditarEntidad<tipoActividadCreacionDTO, tipoActividadDTO>
                url={urlTipoActividad} urlIndice="/tipoActividad" nombreEntidad="TipoActividad"
            >
                {(entidad, editar) => 
                    <FormularioTipoActividad modelo={entidad} 
                    onSubmit={async valores => {
                       await editar(valores);
                    }}
                    /> 
                
                }
            </EditarEntidad>
        </>

    )
}