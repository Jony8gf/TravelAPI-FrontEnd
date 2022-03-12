import LandingPage from "./LandingPage";
import RedireccionarALanding from './utils/RedireccionarALanding'
import Registro from "auth/Registro";
import Login from "auth/Login";
import IndiceUsuarios from "auth/IndiceUsuarios";

const rutas = [
    

    {path: '/usuarios', componente: IndiceUsuarios, esAdmin: true},    

    {path: '/registro', componente: Registro},
    {path: '/login', componente: Login},

    {path: '/', componente: LandingPage, exact: true},
    {path: '*', componente: RedireccionarALanding}
];

export default rutas;