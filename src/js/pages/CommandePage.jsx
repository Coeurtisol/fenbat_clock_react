import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import ListeCommandes from "../components/CommandesComponent";
import Magasin from "../components/MagasinComponent";

const CommandePage = () => {
  const [onglet, setOnglet] = useState("magasin");

  // TEMPLATE
  return (
    <main className="container color-text mt-2">
      <h2 className="text-center">Commandes</h2>
      <div className="commande-container">
        <div className="row">
          <ListGroup horizontal className="d-flex justify-content-center">
            <ListGroup.Item
              className={`onglet-commande ${
                onglet === "magasin" ? "command-active-item" : null
              }`}
              onClick={() => setOnglet("magasin")}
            >
              Magasin
            </ListGroup.Item>
            <ListGroup.Item
              className={`onglet-commande ${
                onglet === "mesCommandes" ? "command-active-item" : null
              }`}
              onClick={() => setOnglet("mesCommandes")}
            >
              Mes commandes
            </ListGroup.Item>
          </ListGroup>
        </div>
        {onglet === "magasin" ? <Magasin /> : <ListeCommandes />}
      </div>
    </main>
  );
};

export default CommandePage;
