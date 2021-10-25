import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main>
      <div className="menu-container">
        <Link to="/pointage">Pointage</Link>
        <Link to="/commandes">Commandes</Link>
      </div>
    </main>
  );
};

export default HomePage;
