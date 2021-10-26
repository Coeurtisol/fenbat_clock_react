import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">/</Link>
        </li>
        <li>
          <Link to="/accueil">/accueil</Link>
        </li>
        <li>
          <Link to="/admin/workers">/admin/workers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;