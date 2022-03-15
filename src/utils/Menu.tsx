import AutenticationContext from '../auth/AutenticationContext';
import Autorizado from '../auth/Autorizado';
import { logout } from '../auth/manejadorJWT';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom'
import Button from './Button';
import { Container, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';

export default function Menu() {
    const { actualizar, claims } = useContext(AutenticationContext);

    function obtenerNombreUsuario(): string {
        return claims.filter(x => x.nombre === 'email')[0]?.valor;
    }

    return (
        <Navbar bg="light" expand="md" sticky="top" >
            <Container>
                <Navbar.Brand href="/">Traveling</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Sobre nosotros</Nav.Link>
                        <Nav.Link href="#action2">Ofertas</Nav.Link>
                        <Autorizado
                                role='admin'
                                autorizado={


                                    <NavDropdown
                                        id="navbarScrollingDropdown"
                                        title="Administración"
                                        menuVariant="light"
                                        className='text-dark'
                                    >
                                        <NavDropdown.Item href="/promociones">Promociones</NavDropdown.Item>
                                        <NavDropdown.Item href="/viajes">Viajes</NavDropdown.Item>
                                        <NavDropdown.Item href="/tipoActividad">Tipo Actividad</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/usuarios">Usuarios</NavDropdown.Item>
                                    </NavDropdown>
                                }
                            />
                        
                    </Nav>
                    <NavItem className='d-flex'>
                                <Autorizado
                                    autorizado={
                                        <>
                                            <span className='nav-link text-primary'>Hola, {obtenerNombreUsuario()}</span>
                                            <Button onClick={() => {
                                                logout();
                                                actualizar([]);
                                            }}
                                                
                                                className='btn btn-outline-danger'
                                                id='logout-claims'
                                            >
                                                Log out
                                            </Button>
                                        </>
                                    }
                                    noAutorizado={
                                        <>
                                            <Link to="/Registro" className='btn btn-outline-success mx-2'>Registro</Link>
                                            <Link to="/Login" className='btn btn-outline-primary mx-2'>Login</Link>
                                        </>
                                    }
                                />
                            </NavItem>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}