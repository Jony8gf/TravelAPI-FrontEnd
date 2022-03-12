import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutenticationContext from "auth/AutenticationContext";
import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2";
import './Rating.css'

export default function Rating(props: ratingProps) {

    const {claims} = useContext(AutenticationContext);
    const [maximoValorArr, setMaximoValorArr] = useState<number[]>([]);
    const [valorSeleccionado, setValorSeleccionado] = useState(props.valorSeleccionado);

    useEffect(() => {
        setMaximoValorArr(Array(props.maximoValor).fill(0));
    }, [props.maximoValor])

    function manejarMouseOver(voto: number){
        setValorSeleccionado(voto);
    }

    function manejarClick(voto: number){
        if (claims.length === 0){
            Swal.fire({title: "Error", text:'Debes loguearte para votar', icon: 'error'});
            return;
        }

        setValorSeleccionado(voto);
        props.onChange(voto);
    }

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            {maximoValorArr.map((valor, indice) =>
                <i className={`fa-solid fa-star pointer ${valorSeleccionado >= indice + 1 ? 'checked': null}`}
                    key={indice}
                    onClick={() => manejarClick(indice + 1)}
                    onMouseOver={() => manejarMouseOver(indice + 1)}>
                </i>
            )}
        </>
    )
}

interface ratingProps {
    maximoValor: number;
    valorSeleccionado: number;
    onChange(voto: number): void;
}