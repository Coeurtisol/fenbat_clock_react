import React, { useContext } from "react";
import AuthContext from "../../js/contexts/AuthContext";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import AUTH_API from "../services/authAPI";

const NavbarComponent = ({ props }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    setIsAuthenticated(false);
    AUTH_API.logout();
    props.history.push("/loginuserlist");

    // AuthAPI.logout();
    // setIsAuthenticated(false);
    // history.push("/");
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && <Nav.Link href="#/">Accueil</Nav.Link>}
            {!isAuthenticated && (
              <Nav.Link href="#/loginuserlist">Connexion</Nav.Link>
            )}
            <NavDropdown title={isAuthenticated? `Connecté (${AUTH_API.getRole()})` : "Non connecté" } id="basic-nav-dropdown">
              <NavDropdown.Item href="#/admin/users">
                Utilisateurs
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#/admin/affaires">
                Affaires
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#/admin/secteursAffaire">
                Secteurs d'affaire
              </NavDropdown.Item>
              <NavDropdown.Item href="#/admin/typesAffaire">
                Types d'affaire
              </NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#/admin/motifsAbsence">
                Motifs d'absence
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#/admin/entites">
                Entités
              </NavDropdown.Item>
              {isAuthenticated && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    Déconnexion
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
