import React from "react";
import { Link } from "react-router-dom";
import DATE_API from "../services/datesAPI.js";
import AUTH_API from "../services/authAPI";
import permissions from "../configs/permissions.js";

const HomePage = () => {
  const permissionId = AUTH_API.getPermissionId();
  return (
    <main>
      <div className="menu-container">
        <Link
          to={`/pointage/${new Date().getFullYear()}/${DATE_API.getWeekNumber(
            new Date()
          )}`}
        >
          <h1>Pointages</h1>
        </Link>
        {permissionId <= permissions.respProd.id && (
          <Link
            to={`/gestion/pointage/${new Date().getFullYear()}/${DATE_API.getWeekNumber(
              new Date()
            )}`}
          >
            <h1>Validation pointages</h1>
          </Link>
        )}
        <Link to="/">
          <h1>Ressources humaines</h1>
        </Link>
        {permissionId != permissions.technicien.id && (
          <Link to="/commandes">
            <h1>Commandes</h1>
          </Link>
        )}
      </div>
    </main>
  );
};

export default HomePage;
