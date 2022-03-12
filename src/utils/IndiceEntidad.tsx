import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import confirmar from "./Confirmar";
import ListadoGenerico from "./ListadoGenerico";
import Paginacion from "./Paginacion";

export default function IndiceEntidad<T>(props: indiceEntidadProps<T>) {

    const [entidades, setEntidades] = useState<T[]>();
    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [recordsPorPagina, setRecordsPorPagina] = useState(10);
    const [pagina, setPagina] = useState(1);


    useEffect(() => {
        cargarDatos();
    }, [pagina, recordsPorPagina])

    function cargarDatos() {
        axios.get(props.url, {
            params: { pagina, recordsPorPagina }
        })
            .then((respuesta: AxiosResponse<T[]>) => {
                const totalDeRegistros =
                    parseInt(respuesta.headers['cantidadtotalregistros'], 10);
                setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina))
                setEntidades(respuesta.data);
                console.log(respuesta.data)
            })
    }

    async function borrar(id: number) {
        try {
            await axios.delete(props.url + "/" + id);
            cargarDatos();
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const botones = (urlEditar: string, id: number) => <>
        <Link className="btn btn-success mx-2" to={urlEditar}>Editar</Link>
        <Button
            onClick={() => confirmar(() => borrar(id))}
            className="btn btn-danger mx-2"
        >Borrar</Button>
    </>

    return (

        <>
            <h3>{props.titulo}</h3>
            {props.urlCrear ? 
                <Link className="btn btn-primary" to={props.urlCrear}>Crear {props.titulo}</Link> 
                : null}

            <select
                className="form-control"
                onChange={e => {
                    setPagina(1);
                    setRecordsPorPagina(Number(e.currentTarget.value))
                }
                }>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>

            <Paginacion
                paginaActual={pagina}
                onChange={nuevaPagina => setPagina(nuevaPagina)}
                cantidadTotalDePaginas={totalDePaginas}
            ></Paginacion>

            <ListadoGenerico listado={entidades}>
                <table className="table table-striped">
                    {props.children(entidades!, botones)}
                </table>
            </ListadoGenerico>
        </>


    )
}

interface indiceEntidadProps<T> {
    url: string;
    urlCrear?: string;
    children(entidades: T[],
        botones: (urlEditar: string, id: number) => ReactElement): ReactElement;
    titulo: string;
    nombreEntidad?: string;
}