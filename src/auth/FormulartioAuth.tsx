import { Form, Formik, FormikHelpers } from "formik";
import { credencialesUsuario } from "./auth.model";
import * as Yup from 'yup';
import FormGroupText from "utils/FormGroupText";
import Button from "utils/Button";
import { Link, useParams } from "react-router-dom";

export default function FormularioAuth(props: formularioAuthProps){

    return(

        <>
            {props.type === 'logout' ?
        <Formik initialValues={props.modelo}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            email: Yup.string().required('Este campo es requerido').email('Debe colocar un email valido'),
            password: Yup.string().required('Este campo es requerido') 
                .min(8, 'La contraseña es demasiado pequeña - El numero de caracteres minimo es 8.'),
            password2: Yup.string().required('Este campo es requerido') 
                .min(8, 'La contraseña es demasiado pequeña - El numero de caracteres minimo es 8.')
                .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
        })} 
        
        >
        
            {formikProps => (
                <Form>
                    <FormGroupText label="Email" campo="email" />
                    <FormGroupText label="Password" campo="password" type="password" />
                    {props.type === 'logout' ? <FormGroupText label="Repetir Password" campo="password2" type="password" /> : null }
                    

                    <Button disabled={formikProps.isSubmitting} type="submit">Enviar</Button>
                    <Link className="btn btn-secondary" to="/">Cancelar</Link>
                </Form>
            )}


        </Formik>
         : <Formik initialValues={props.modelo}
         onSubmit={props.onSubmit}
         validationSchema={Yup.object({
             email: Yup.string().required('Este campo es requerido').email('Debe colocar un email valido'),
             password: Yup.string().required('Este campo es requerido') 
                 .min(8, 'La contraseña es demasiado pequeña - El numero de caracteres minimo es 8.'),
         })} 
         
         >
         
             {formikProps => (
                 <Form>
                     <FormGroupText label="Email" campo="email" />
                     <FormGroupText label="Password" campo="password" type="password" />
                     

                     <Button disabled={formikProps.isSubmitting} type="submit">Enviar</Button>
                     <Link className="btn btn-secondary" to="/">Cancelar</Link>
                 </Form>
             )}


         </Formik> }

        
        
        </>
        
    )
}

interface formularioAuthProps{
    modelo: credencialesUsuario;
    type: string;
    onSubmit(valores: credencialesUsuario, acciones: FormikHelpers<credencialesUsuario>): void
}