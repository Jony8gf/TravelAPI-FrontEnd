import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet"
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css';
import {coordenadaDTO} from './coordenadas.model'
import { useState } from "react";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa(props: mapaProps){
    const [coordenadas, setCoordenadas] = useState<coordenadaDTO[]>(props.coordenadas)
    const [lat, setLat] = useState<number>(0);
    const [long, setLong] = useState<number>(0);

    navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

    return (

        // center={[18.467455, -69.931242]} zoom={14}
        <MapContainer
            center={[lat, long]} zoom={14}
            style={{height: props.height}}
        >
            <TileLayer attribution="React Travel"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
                <ClickMapa setPunto={coordenadas => {
                    setCoordenadas([coordenadas]);
                    props.manejarClickMapa(coordenadas);
                }} />

{/* {props.soloLectura ? 
                <ClickMapa setPunto={coordenadas => {
                    setCoordenadas([coordenadas]);
                    props.manejarClickMapa(coordenadas);
                }} /> : null} */}
            
            {coordenadas.map(coordenada => <Marcador key={coordenada.lat + coordenada.lng} 
              {...coordenada}
            />)}
        </MapContainer>
    )
}

interface mapaProps {
    height: string;
    coordenadas: coordenadaDTO[];
    manejarClickMapa(coordenadas: coordenadaDTO): void;
    soloLectura: boolean;
}

Mapa.defaultProps = {
    height: '500px',
    soloLectura: false,
    manejarClickMapa: () => {}
}

function ClickMapa(props: clickMapaProps){
    useMapEvent('click', e => {
        props.setPunto({lat: e.latlng.lat, lng: e.latlng.lng})
    })
    return null;
}

interface clickMapaProps {
    setPunto(coordenadas: coordenadaDTO): void;
}

function Marcador(props: coordenadaDTO){
    return (
        <Marker position={[props.lat, props.lng]}> 
            {props.nombre ? <Popup>{props.nombre}</Popup> : null}
        </Marker>
    )
}

