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

const rutas = [
    {path: '/tipoActividad/crear', componente: CrearTipoActividad, esAdmin: true},
    {path: '/tipoActividad/editar/:id(\\d+)', componente: EditarTipoActividad, esAdmin: true},
    {path: '/tipoActividad', componente: IndiceTipoActividad, exact: true, esAdmin: true},


    {path: '/promociones/crear', componente: CrearPromocion, esAdmin: true},
    {path: '/promociones/editar/:id(\\d+)', componente: EditarPromocion, esAdmin: true},
    {path: '/promociones', componente: IndicePromocion, exact: true, esAdmin: true},

    {path: '/usuarios', componente: IndiceUsuarios, esAdmin: true},    

    {path: '/registro', componente: Registro},
    {path: '/login', componente: Login},

    {path: '/', componente: LandingPage, exact: true},
    {path: '*', componente: RedireccionarALanding}
];

export default rutas;