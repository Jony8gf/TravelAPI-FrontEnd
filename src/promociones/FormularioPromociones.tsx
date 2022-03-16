import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "utils/Button";
import * as Yup from 'yup'
import FormGroupText from "utils/FormGroupText";
import { promocionCreacionDTO } from "./promociones.model";
import FormGroupFecha from "utils/FormGroupFecha";


export default function FormularioPromociones(props: formularioPromocionesProps){
    console.log(props)

    return(
        <Formik initialValues={props.modelo}
            onSubmit={props.onSubmit}

            validationSchema={Yup.object({
                nombre: Yup.string().required('Este campo es requerido'),
                fechaHasta: Yup.date().required('Este campo es requerido'),
                fechaDesde: Yup.date().required('Este campo es requerido'),
                porcentajeDescuento: Yup.number().required('Este campo es requerido')
                    .positive("Ingresa un número mayor que 0"),
            })}

        >
            {(formikProps) => (
                <Form>
                    <FormGroupText campo="nombre" label="Nombre" />
                    <FormGroupFecha campo="fechaDesde" label="Fecha Desde" />
                    <FormGroupFecha campo="fechaHasta" label="Fecha hasta" />
                    <FormGroupText campo="porcentajeDescuento" label="Porcentaje de Descuento" type="number"/>
                    <Button disabled={formikProps.isSubmitting} 
                        type="submit">Salvar</Button>
                    <Link className="btn btn-secondary" to="/promociones">Cancelar</Link>
                </Form>
            )}

        </Formik>
    )
}

interface formularioPromocionesProps{
    modelo: promocionCreacionDTO;
    onSubmit(valores: promocionCreacionDTO, accion: FormikHelpers<promocionCreacionDTO>): void;
}