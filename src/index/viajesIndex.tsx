import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlViajes } from "utils/endpoints";
import { viajeDTO } from "viajes/viajes.model";

export default function ViajesIndex() {

    const valorInicial: filtroViajesForm = {
        pais: '',
        lugar: '',
        promocionId: 0,
        tipoActividadId: 0,
        pagina: 1,
        recordsPorPagina: 10
    }

    const [viajes, setViajes] = useState<viajeDTO[]>([]);
    const [totalDePaginas, setTotalDePaginas] = useState(1);

    useEffect(() => {
        buscarViajes(valorInicial);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function buscarViajes(valores: filtroViajesForm) {
        axios.get(`${urlViajes}/filtrar`, { params: valores })
            .then((respuesta: AxiosResponse<viajeDTO[]>) => {
                const totalDeRegistros =
                    parseInt(respuesta.headers['cantidadtotalregistros'], 10);
                setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina))
                setViajes(respuesta.data);
                console.log(respuesta.data);
            })
    }

    return (
        <div id="viajes" className="my-3">
            <h2 className="text-center">Viajes</h2>
            <div className="row">
                {viajes.map((s) => (
                    <div className="col-md-3 my-3 h-75 col-12">
                        <div className="card" key={s.id+"-"+s.precio} >
                            <img src={s.foto} className="card-img-top"  alt={s.lugar} width="200" height="200"/>
                            <div className="card-body text-center">
                                <h3>{s.lugar}</h3>
                                <h5>{s.pais}</h5>
                                <p className="card-text">{s.descripcion}</p>
                                
                            </div>
                            <div className="card-footer text-end">
                                <span className="font-weight-bold text-danger">{s.precio}€</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>  
    )
}

interface filtroViajesForm {
    pais: string;
    lugar: string;
    tipoActividadId: number;
    promocionId: number;
    pagina: number;
    recordsPorPagina: number;
}