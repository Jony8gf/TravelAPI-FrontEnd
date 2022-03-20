import LandingPage from "./LandingPage";
import RedireccionarALanding from './utils/RedireccionarALanding'
import Registro from "auth/Registro";
import Login from "auth/Login";
import IndiceUsuarios from "auth/IndiceUsuarios";
import CrearTipoActividad from "tipoActividad/CrearTipoActividad";
import EditarTipoActividad from "tipoActividad/EditarTipoActividad";
import IndiceTipoActividad from "tipoActividad/IndiceTipoActividad";
import IndicePromocion from "promociones/IndicePromocion";
import EditarPromocion from "promociones/EditarPromocion";
import CrearPromocion from "promociones/CrearPromocion";
import FiltroViajes from "viajes/FiltroViajes";
import CrearViajes from "viajes/CrearViajes";
import EditarViajes from "viajes/EditarViajes";

const rutas = [
    {path: '/tipoActividad/crear', componente: CrearTipoActividad, esAdmin: true},
    {path: '/tipoActividad/editar/:id(\\d+)', componente: EditarTipoActividad, esAdmin: true},
    {path: '/tipoActividad', componente: IndiceTipoActividad, exact: true, esAdmin: true},

    {path: '/promociones/crear', componente: CrearPromocion, esAdmin: true},
    {path: '/promociones/editar/:id(\\d+)', componente: EditarPromocion, esAdmin: true},
    {path: '/promociones', componente: IndicePromocion, exact: true, esAdmin: true},

    {path: '/viajes/crear', componente: CrearViajes, esAdmin: true},
    {path: '/viajes/editar/:id(\\d+)', componente: EditarViajes, esAdmin: true},
    {path: '/viajes/filtrar', componente: FiltroViajes, exact: true, esAdmin: true},

    {path: '/usuarios', componente: IndiceUsuarios, esAdmin: true},    

    {path: '/registro', componente: Registro},
    {path: '/login', componente: Login},

    {path: '/', componente: LandingPage, exact: true},
    {path: '*', componente: RedireccionarALanding}
];

export default rutas;