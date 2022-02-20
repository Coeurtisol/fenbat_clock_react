import React from "react";
import ListeCommandes from "../components/CommandesComponent";

const GestionCommandePage = () => {
  return (
    <main className="container color-text mt-2">
      <h2 className="text-center">Gestion commandes</h2>
      <ListeCommandes />
    </main>
  );
};

export default GestionCommandePage;
