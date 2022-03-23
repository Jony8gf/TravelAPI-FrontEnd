import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { promocionDTO } from "promociones/promociones.model";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { tipoActividadDTO } from "tipoActividad/tipoactividad.model";
import Button from "utils/Button";
import { urlPromocion, urlTipoActividad, urlViajes } from "utils/endpoints";
import Paginacion from "utils/Paginacion";
import ListadoViajes from "./ListadoViajes";
import { viajeDTO } from "./viajes.model";

export default function FiltroViajes() {

    const valorInicial: filtroViajesForm = {
        pais: '',
        lugar: '',
        promocionId: 0,
        tipoActividadId: 0,
        pagina: 1,
        recordsPorPagina: 10
    }

    const [tipoActividades, setTipoActividades] = useState<tipoActividadDTO[]>([]);
    const [promociones, setPromociones] = useState<promocionDTO[]>([]);
    const [viajes, setViajes] = useState<viajeDTO[]>([]);
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);
    const query = new URLSearchParams(useLocation().search)
    const [totalDePaginas, setTotalDePaginas] = useState(0);

    useEffect(() => {
        axios.get(`${urlPromocion}/todos`)
        .then((respuesta: AxiosResponse<promocionDTO[]>) => {
            setPromociones(respuesta.data);
        })
    }, [])

    useEffect(() => {
        axios.get(`${urlTipoActividad}/todos`)
        .then((respuesta: AxiosResponse<tipoActividadDTO[]>) => {
            setTipoActividades(respuesta.data);
        })
    }, [])

    useEffect(() => {

        if(query.get('lugar')){
            valorInicial.lugar = query.get('lugar')!;
        }

        if(query.get('pais')){
            valorInicial.pais = query.get('pais')!;
        }

        if(query.get('tipoActividadId')){
            valorInicial.tipoActividadId = parseInt(query.get('tipoActividadId')!, 10);
        }

        if(query.get('promocionId')){
            valorInicial.promocionId = parseInt(query.get('promocionId')!, 10);
        }

        if(query.get('pagina')){
            valorInicial.pagina = parseInt(query.get('pagina')!, 10);
        }

        buscarViajes(valorInicial);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function buscarViajes(valores: filtroViajesForm){
        modificarURL(valores);
        axios.get(`${urlViajes}/filtrar`, {params: valores})
        .then((respuesta: AxiosResponse<viajeDTO[]>) => {
            const totalDeRegistros =
                    parseInt(respuesta.headers['cantidadtotalregistros'], 10);
            setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina))
            setViajes(respuesta.data);
        })
    }

    function modificarURL(valores: filtroViajesForm){
        const queryStrings: string[] = [];
        if(valores.pais){
            queryStrings.push(`pais=${valores.pais}`)
        }

        if(valores.lugar){
            queryStrings.push(`lugar=${valores.lugar}`)
        }

        if(valores.promocionId !==  0){
            queryStrings.push(`promocionId=${valores.promocionId}`)
        }

        if(valores.tipoActividadId !== 0){
            queryStrings.push(`tipoActividadId=${valores.tipoActividadId}`)
        }

        queryStrings.push(`pagina=${valores.pagina}`);
        history.push(`/viajes/filtrar?${queryStrings.join('&')}`)
    }


    return (
        <>
            <h3>Filtrar Viajes</h3>

            <Link className="btn btn-primary" to={"/viajes/crear"}>Crear Viaje</Link>

            <Formik initialValues={valorInicial}
                onSubmit={valores => {
                    valores.pagina = 1;
                    buscarViajes(valores)
                }}
            >
                {(formikProps) => (
                    <>
                    <Form>
                        <div className="form-inline">
                            <div className="form-group mb-2">
                                <label htmlFor="pais" className="sr-only">Pais</label>
                                <input type="text"
                                    className="form-control" id="pais"
                                    placeholder="Pais"
                                    {...formikProps.getFieldProps('pais')}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="lugar" className="sr-only">Lugar</label>
                                <input type="text"
                                    className="form-control" id="lugar"
                                    placeholder="Lugar"
                                    {...formikProps.getFieldProps('lugar')}
                                />
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <select className="form-control"
                                    {...formikProps.getFieldProps('tipoActividadId')}
                                >
                                    <option value="0">--Seleccione un Tipo de Actividad--</option>
                                    {tipoActividades.map(actividad => <option key={actividad.id}
                                        value={actividad.id}>{actividad.nombre}</option>)}
                                </select>
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <select className="form-control"
                                    {...formikProps.getFieldProps('generoId')}
                                >
                                    <option value="0">--Seleccione una Promoción--</option>
                                    {promociones.map(promocion => <option key={promocion.id}
                                        value={promocion.id}>{promocion.nombre}</option>)}
                                </select>
                            </div>
                            <Button
                            className="btn btn-primary mb-2 mx-sm-3"
                             onClick={() => formikProps.submitForm()}
                            >Filtrar</Button>
                            <Button
                                className="btn btn-danger mb-2"
                                onClick={() => {
                                    formikProps.setValues(valorInicial);
                                    buscarViajes(valorInicial)
                                }}
                            >Limpiar</Button>
                        </div>
                    </Form>

                    <ListadoViajes viajes={viajes} />

                    <Paginacion
                        paginaActual={formikProps.values.pagina}
                        onChange={nuevaPagina => {
                            formikProps.values.pagina = nuevaPagina;
                            buscarViajes(formikProps.values)
                        }}
                        cantidadTotalDePaginas={totalDePaginas}
                    ></Paginacion>
                    </>
                )}
            </Formik>

            

        </>

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