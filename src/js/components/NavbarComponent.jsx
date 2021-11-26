import React, { useContext } from "react";
import AuthContext from "../../js/contexts/AuthContext";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import AUTH_API from "../services/authAPI";

const NavbarComponent = ({ props }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    setIsAuthenticated(false);
    AUTH_API.logout();
    props.history.push("/loginuserlist");
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Accueil</Nav.Link>
            <NavDropdown
              title={`Connecté (${AUTH_API.getRole()})`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#/admin/users">
                Utilisateurs
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#/admin/affaires">
                Affaires
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#/admin/motifsAbsence">
                Motifs d'absence
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#/admin/entites">
                Entités
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Déconnexion</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
