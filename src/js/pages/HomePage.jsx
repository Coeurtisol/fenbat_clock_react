import React from "react";
import { Link } from "react-router-dom";
import DATE_API from "../services/datesAPI.js";
import AUTH_API from "../services/authAPI";
import { useEffect } from "react";
import { useState } from "react";
import COMMANDES_API from "../services/commandesAPI.js";
import SEMAINES_API from "../services/semainesAPI.js";
import { toast } from "react-toastify";

const HomePage = () => {
  const [notifications, setNotifications] = useState({
    commandes: 0,
    semaines: 0,
  });

  const fetchNotifications = async () => {
    try {
      const commandes = await COMMANDES_API.getNumberCommandesEnAttente();
      const semaines = await SEMAINES_API.getNumberSemainesEnAttente(
        DATE_API.getWeekNumber(new Date())
      );
      setNotifications({ commandes, semaines });
    } catch (error) {
      console.log(error);
      toast.error("Erreur au chargement des notifications");
    }
  };

  useEffect(() => {
    if (AUTH_API.estResp()) {
      fetchNotifications();
    }
  }, []);

  return (
    <main className="accueil">
      <div className="menu-container">
        <Link
          to={`/pointage/${new Date().getFullYear()}/${DATE_API.getWeekNumber(
            new Date()
          )}`}
        >
          <h1>Pointages</h1>
        </Link>
        {AUTH_API.estResp() && (
          <Link
            to={`/gestion/pointage/${new Date().getFullYear()}/${DATE_API.getWeekNumber(
              new Date()
            )}`}
          >
            {notifications.semaines > 0 && (
              <div className="notification">
                <span>{notifications.semaines}</span>
              </div>
            )}
            <h1>Validation pointages</h1>
          </Link>
        )}
        {/* <Link to="/">
          <h1>Ressources humaines</h1>
        </Link> */}
        {AUTH_API.estResp() && (
          <Link to="/gestion/commandes">
            {notifications.commandes > 0 && (
              <div className="notification">
                <span>{notifications.commandes}</span>
              </div>
            )}
            <h1>Validation commandes</h1>
          </Link>
        )}
        {AUTH_API.estChefEquipe() && (
          <Link to="/commandes">
            <h1>Commandes</h1>
          </Link>
        )}
        {AUTH_API.estResp() && (
          <Link to="/overview">
            <h1>Overview (WIP)</h1>
          </Link>
        )}
      </div>
    </main>
  );
};

export default HomePage;
