import { Form, Formik, FormikHelpers } from "formik";import * as Yup from 'yup'
import FormGroupText from "utils/FormGroupText";
import FormGroupCheckbox from "utils/FormGroupCheckbox";
import FormGroupFecha from "utils/FormGroupFecha";
import FormGroupImagen from "utils/FormGroupImagen";
import Button from "utils/Button";
import { Link } from "react-router-dom";
import SelectorMultiple, { selectorMultipleModel } from "utils/SelectorMultiple";
import { useState } from "react";
import FormGroupMarkdown from "utils/FormGroupMarkdown";
import { viajeCreacionDTO } from "./viajes.model";
import { tipoActividadDTO } from "tipoActividad/tipoactividad.model";
import { promocionDTO } from "promociones/promociones.model";
import MapaFormulario from "utils/MapaFormulario";
import { coordenadaDTO } from "utils/coordenadas.model";

export default function FormularioViajes(props: formularioViajesProps) {
    
    const [tiposActividadSeleccionados, setTiposActividadSeleccionados] = 
    useState(mapear(props.tiposActividadesSeleccionados));
    const [tiposActividadNoSeleccionados, setTiposActividadNoSeleccionados] = 
    useState(mapear(props.tiposActividadesNoSeleccionados));

    const [promocionesSeleccionados, setPromocionesSeleccionados] =
    useState(mapear(props.promocionesSeleccionados));
    const [promocionesNoSeleccionados, setPromocionesNoSeleccionados] =
    useState(mapear(props.promocionesNoSeleccionados));
    
    function mapear(arreglo: {id: number, nombre: string}[]): selectorMultipleModel[]{
        return arreglo.map(valor => {
            return {llave: valor.id, valor: valor.nombre}
        })
    }

    function transformarCoordenada(): coordenadaDTO[] | undefined {
        if (props.modelo.latitud && props.modelo.longitud){
            const respuesta: coordenadaDTO = {lat: props.modelo.latitud, 
                lng: props.modelo.longitud, nombre: props.modelo.lugar}
            return [respuesta];
        }

        return undefined;
    }

    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={(valores, acciones) => {
                valores.tipoActividadesIds = tiposActividadSeleccionados.map(valor => valor.llave);
                valores.promocionesIds = promocionesSeleccionados.map(valor => valor.llave);
                props.onSubmit(valores, acciones);
            }}
            validationSchema={Yup.object({
                pais: Yup.string().required('Este campo es requerido'),
                lugar: Yup.string().required('Este campo es requerido'),
                precio: Yup.number().required('Este campo es requerido')
                    .positive("Ingresa un número mayor que 0"),
            })}
        >
            {formikProps => (
                <Form>
                    <FormGroupText label="Pais" campo="pais" />
                    <FormGroupText label="Lugar" campo="lugar" />
                    <FormGroupImagen campo="foto" label="Foto"
                        imagenURL={props.modelo.fotoURL} />
                    <FormGroupMarkdown campo="descripcion" label="Descripcion" />
                    <FormGroupText label="Precio" campo="precio" type="number"/>
                    <div className="form-group">
                        <label>Tipos de Actividades:</label>
                        <SelectorMultiple seleccionados={tiposActividadSeleccionados}
                            noSeleccionados={tiposActividadNoSeleccionados}
                            onChange={(seleccionados, noSeleccionados) => {
                                setTiposActividadSeleccionados(seleccionados)
                                setTiposActividadNoSeleccionados(noSeleccionados);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Promociones:</label>
                        <SelectorMultiple seleccionados={promocionesSeleccionados}
                            noSeleccionados={promocionesNoSeleccionados}
                            onChange={(seleccionados, noSeleccionados) => {
                                setPromocionesSeleccionados(seleccionados)
                                setPromocionesNoSeleccionados(noSeleccionados);
                            }}
                        />
                    </div>

                    <div style={{marginBottom: '1rem'}}>
                        <MapaFormulario campoLat="latitud" campoLng="longitud"
                            coordenadas={transformarCoordenada()}
                        />
                    </div>

                    <Button disabled={formikProps.isSubmitting} type="submit">Enviar</Button>
                    <Link className="btn btn-secondary" to="/">Cancelar</Link>
                </Form>
            )}
        </Formik>
    )
}

interface formularioViajesProps {
    modelo: viajeCreacionDTO;
    onSubmit(valores: viajeCreacionDTO, acciones: FormikHelpers<viajeCreacionDTO>): void;
    tiposActividadesSeleccionados: tipoActividadDTO[];
    tiposActividadesNoSeleccionados: tipoActividadDTO[];
    promocionesSeleccionados: promocionDTO[];
    promocionesNoSeleccionados: promocionDTO[];
}