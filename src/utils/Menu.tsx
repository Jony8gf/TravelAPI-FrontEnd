import AutenticationContext from '../auth/AutenticationContext';
import Autorizado from '../auth/Autorizado';
import { logout } from '../auth/manejadorJWT';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom'
import Button from './Button';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function Menu() {
    const claseActiva = "active";
    const { actualizar, claims } = useContext(AutenticationContext);

    function obtenerNombreUsuario(): string {
        return claims.filter(x => x.nombre === 'email')[0]?.valor;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand"
                    activeClassName={claseActiva}
                    to="/">React Viajes</NavLink>
                <div className="collapse navbar-collapse" style={
                    { display: 'flex', justifyContent: 'space-between' }
                }>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" activeClassName={claseActiva}
                                to="/peliculas/filtrar">
                                Filtrar Películas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName={claseActiva}
                                to="/peliculas/filtrar">
                                Filtrar Películas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName={claseActiva}
                                to="/peliculas/filtrar">
                                Filtrar Películas
                            </NavLink>
                        </li> */}
                        <Autorizado
                            role='admin'
                            autorizado={
                                <>
                                    <Navbar.Collapse id="navbar-dark-example">
                                        <Nav>
                                            <NavDropdown
                                                id="nav-dropdown-dark-example"
                                                title="Dropdown"
                                                menuVariant="light"
                                            >
                                                <NavDropdown.Item href="/promociones">Promociones</NavDropdown.Item>
                                                <NavDropdown.Item href="/viajes">Viajes</NavDropdown.Item>
                                                <NavDropdown.Item href="/tipoactividad">Tipo Actividad</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="/usuarios">Usuarios</NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                    </Navbar.Collapse>
                                    {/* <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                                        <ul className="navbar-nav">
                                            <li className="nav-item dropdown">
                                                {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Dropdown
                                                </a> */}
                                    {/* <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li>
                                                        <NavLink className="dropdown-item" activeClassName={claseActiva}
                                                            to="/usuarios">
                                                            Usuarios
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink className="dropdown-item" activeClassName={claseActiva}
                                                            to="/promociones">
                                                            Promociones
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink className="dropdown-item" activeClassName={claseActiva}
                                                            to="/viajes">
                                                            Viajes
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink className="dropdown-item" activeClassName={claseActiva}
                                                            to="/tipoactividad">
                                                            Tipo Actividad
                                                        </NavLink>
                                                    </li>
                                                </ul> */}
                                    {/* </li>
                                        </ul> */}
                                </>}
                        />

                    </ul>

                    <div className='d-flex'>
                        <Autorizado
                            autorizado={
                                <>
                                    <span className='nav-link'>Hola, {obtenerNombreUsuario()}</span>
                                    <Button onClick={() => {
                                        logout();
                                        actualizar([]);
                                    }}
                                        className='nav-link btn btn-link'
                                    >
                                        Log out
                                    </Button>
                                </>
                            }
                            noAutorizado={
                                <>
                                    <Link to="/Registro" className='nav-link btn btn-link'>Registro</Link>
                                    <Link to="/Login" className='nav-link btn btn-link'>Login</Link>
                                </>
                            }
                        />
                    </div>

                </div>
            </div>
        </nav>
    )
}