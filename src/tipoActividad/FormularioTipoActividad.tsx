import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup'
import Button from "utils/Button";
import FormGroupText from "utils/FormGroupText";
import { tipoActividadCreacionDTO } from "./tipoactividad.model";

export default function FormularioGeneros(props: formularioTipoActividadProps){
    return(
        <Formik initialValues={props.modelo}
            onSubmit={props.onSubmit}

            validationSchema={Yup.object({
                nombre: Yup.string().required('Este campo es requerido')
            })}

        >
            {(formikProps) => (
                <Form>
                    <FormGroupText campo="nombre" label="Nombre" />

                    <Button disabled={formikProps.isSubmitting} 
                        type="submit">Salvar</Button>
                    <Link className="btn btn-secondary" to="/tipoActividad">Cancelar</Link>
                </Form>
            )}

        </Formik>
    )
}

interface formularioTipoActividadProps{
    modelo: tipoActividadCreacionDTO;
    onSubmit(valores: tipoActividadCreacionDTO, accion: FormikHelpers<tipoActividadCreacionDTO>): void;
}