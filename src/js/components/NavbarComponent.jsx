import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/accueil">Accueil</Nav.Link>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="#/admin/users">
                Utilisateurs
              </NavDropdown.Item><NavDropdown.Divider />
              <NavDropdown.Item href="#/admin/entites">
                Entités
              </NavDropdown.Item><NavDropdown.Divider />
              <NavDropdown.Item href="#/admin/affaires">
                Affaires
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#/admin/etatsAffaire">
                Etats d'affaire
              </NavDropdown.Item> */}
              <NavDropdown.Item href="#/admin/secteursAffaire">
                Secteurs d'affaire
              </NavDropdown.Item>
              <NavDropdown.Item href="#/admin/typesAffaire">
                Types d'affaire
              </NavDropdown.Item><NavDropdown.Divider />
              <NavDropdown.Item href="#/admin/motifsAbsence">
                Motifs d'absence
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
