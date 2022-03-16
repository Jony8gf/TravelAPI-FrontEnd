import { urlPromocion } from "utils/endpoints";
import IndiceEntidad from "utils/IndiceEntidad";
import { promocionDTO } from "./promociones.model";

export default function IndicePromocion() {

    return (
        <>

                <IndiceEntidad<promocionDTO> 
                url={urlPromocion}
                urlCrear="promociones/crear"
                titulo="Promociones"
                nombreEntidad="Promociones">

                    {(promociones, botones) => 
                        <>
                            <thead>
                            <th></th>
                            <th>Nombre</th>
                            <th>Fecha desde</th>
                            <th>Fecha hasta</th>
                            <th>Porcentaje Descuento</th>
                        </thead>
                        <tbody>
                            {promociones?.map(promocion => 
                                <tr key={promocion.id}>
                                    <td>
                                       {botones(`promociones/editar/${promocion.id}`, promocion.id)} 
                                    </td>
                                    <td>
                                        {promocion.nombre}
                                    </td>
                                    <td>
                                        {promocion.fechaDesde}
                                    </td>
                                    <td>
                                        {promocion.fechaHasta}
                                    </td>
                                    <td>
                                        {promocion.porcentajeDescuento}
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