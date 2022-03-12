export default function MostrarErrores(props: mostrarErroresProps){
    return(
        <>
            {props.errores ?
                    <ul>
                        {props.errores.map((error, indice) => <li className="alert alert-danger" key={indice}>{error}</li>)}
                    </ul> : null}
        </>
    )
}

interface mostrarErroresProps{
    errores?: string[];
}