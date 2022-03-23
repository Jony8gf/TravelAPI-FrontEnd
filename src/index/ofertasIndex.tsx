import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { urlViajes } from "utils/endpoints";
import { viajeDescuentoDTO } from "viajes/viajes.model";

export default function OfertasIndex() {

    const [ofertas, setOfertas] = useState<viajeDescuentoDTO[]>([]);
    const [totalDePaginas, setTotalDePaginas] = useState(1);

    useEffect(() => {
        buscarOfertas();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function buscarOfertas() {
        axios.get(`${urlViajes}/all`)
            .then((respuesta: AxiosResponse<viajeDescuentoDTO[]>) => {
                setOfertas(respuesta.data);
                console.log(respuesta.data);
            })
    }

    return (
        <div id="ofertas" className="my-3">
            <h2 className="text-center">Ofertas</h2>

            <Carousel>
                {ofertas.map((s) => (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={s.foto}
                            alt={s.descripcion}
                            width="450" height="450"
                        />
                        <Carousel.Caption className="bg-light">
                            <h4 className="text-danger">{s.lugar}</h4>
                            <h5 className="text-dark">{s.pais}</h5>
                            <p className="text-dark">{s.descripcion}</p>
                            <span className="text-dark mx-2">Antes:<span className="font-weight-bold text-decoration-line-through text-danger"> {s.precio}€</span></span>
                            <span className="text-dark mx-2">Ahora:<span className="font-weight-bold text-success"> {s.precioDescuento}€</span></span>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}