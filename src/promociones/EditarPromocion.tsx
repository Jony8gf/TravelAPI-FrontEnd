import EditarEntidad from "utils/EditarEntidad";
import { urlPromocion} from "utils/endpoints";
import FormularioPromociones from "./FormularioPromociones";
import { promocionCreacionDTO, promocionDTO } from "./promociones.model";


export default function EditarTipoActividad() {

    return (
        <>
            <EditarEntidad<promocionCreacionDTO, promocionDTO>
                url={urlPromocion} urlIndice="/promociones" nombreEntidad="Promociones"
            >
                {(entidad, editar) => 
                    <FormularioPromociones modelo={entidad} 
                    onSubmit={async valores => {
                       await editar(valores);
                    }}
                    /> 
                
                }
            </EditarEntidad>
        </>

    )
}