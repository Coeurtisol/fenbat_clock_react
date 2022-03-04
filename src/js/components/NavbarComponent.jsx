import React, { useContext } from "react";
import AuthContext from "../../js/contexts/AuthContext";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import AUTH_API from "../services/authAPI";
import permissions from "../configs/permissions.js";
import { useHistory } from "react-router-dom";

const NavbarComponent = () => {
  const history = useHistory();
  const permissionId = AUTH_API.getPermissionId();
  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    setIsAuthenticated(false);
    AUTH_API.logout();
    history.push("/");
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Accueil</Nav.Link>
            <NavDropdown
              title={`${AUTH_API.getFullName()} (${AUTH_API.getRole()})`}
              id="basic-nav-dropdown"
            >
              {permissionId <= permissions.respProd.id && (
                <NavDropdown.Item href="#/admin/users">
                  Utilisateurs
                </NavDropdown.Item>
              )}
              {permissionId == permissions.respSite.id && (
                <NavDropdown.Item href="#/admin/roles">Rôles</NavDropdown.Item>
              )}
              {permissionId <= permissions.respProd.id && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/admin/affaires">
                    Affaires
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              )}
              {permissionId == permissions.respSite.id && (
                <>
                  <NavDropdown.Item href="#/admin/motifsAbsence">
                    Motifs d'absence
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/admin/entites">
                    Entités
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              )}
              {permissionId <= permissions.respProd.id && (
                <>
                  <NavDropdown.Item href="#/admin/articles">
                    Articles
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              )}
              <NavDropdown.Item href="#/moncompte">Mon compte</NavDropdown.Item>
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
