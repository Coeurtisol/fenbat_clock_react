import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <main>
      <div className="menu-container">
        <Link to="/pointage">
          <h1>Pointages</h1>
        </Link>
        <Link to="/">
          <h1>Ressources humaines</h1>
        </Link>
        <Link to="/commandes">
          <h1>Commandes</h1>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
