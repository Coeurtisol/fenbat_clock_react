import React from "react";
import { Link } from "react-router-dom";
import AUTH_API from "../services/authAPI";
import SEMAINES_API from "../services/semainesAPI";
import POINTAGES_API from "../services/pointagesAPI";

const HomePage = () => {
  const semaine = {
    userId: AUTH_API.getId(),
    etatSemaineId: 1,
    commentaire: "à revoir",
    pointages: [
      {
        hour: 5,
        userId: AUTH_API.getId(),
        // motifAbsenceId:1,
        affaireId: 5,
        entiteId: 1,
        // semaineId: 1,
      },
      {
        hour: 3,
        userId: AUTH_API.getId(),
        motifAbsenceId: 1,
        affaireId: 6,
        entiteId: 1,
        // semaineId: 1,
      },
    ],
  };

  const pointages = [
    // {
    //   hour: 5,
    //   userId: AUTH_API.getId(),
    //   // motifAbsenceId:1,
    //   affaireId: 5,
    //   entiteId: 1,
    //   semaineId: 1,
    // },
    // {
    //   hour: 3,
    //   userId: AUTH_API.getId(),
    //   motifAbsenceId: 1,
    //   affaireId: 6,
    //   entiteId: 1,
    //   semaineId: 1,
    // },
  ];

  const handleSubmitSemaine = async () => {
    try {
      const resp = await SEMAINES_API.create(semaine);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPointages = async () => {
    try {
      const resp = await POINTAGES_API.create(pointages);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className="menu-container">
        {/* <button type="button" onClick={handleSubmitSemaine}>
          semaine
        </button>
        <button type="button" onClick={handleSubmitPointages}>
          pointages
        </button> */}
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
