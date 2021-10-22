import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main>
      <ul>
          <li><Link to="/pointage">Pointage</Link></li>
          <li><Link to="/commandes">Commandes</Link></li>
      </ul>
    </main>
  );
};

export default HomePage;
