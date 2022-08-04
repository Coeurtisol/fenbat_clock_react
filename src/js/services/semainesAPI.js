import axios from "axios";
import { SEMAINES_API_URL } from "../configs/api_links";

// async function create(semaine) {
//   return await axios.post(SEMAINES_API_URL, semaine);
// }

async function getAllByWeek(year, week) {
  return await axios.get(`${SEMAINES_API_URL}/gestion/${year}/${week}`);
}

async function findOne(year, week, userId) {
  return await axios.get(`${SEMAINES_API_URL}/${year}/${week}/${userId}`);
}

async function getNumberSemainesEnAttente(numeroSemaine) {
  const response = await axios.get(
    SEMAINES_API_URL + "/enattente/" + numeroSemaine
  );
  return response.data;
}

async function update(semaine) {
  return await axios.put(SEMAINES_API_URL + "/" + semaine.id, { semaine });
}

async function getPDF(prenomNom, annee, semaine, version) {
  axios
    .get(
      `${SEMAINES_API_URL}/pdf/${prenomNom}/${annee}/${semaine}/${version}`,
      {
        responseType: "blob",
      }
    )
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `pointage-${prenomNom}-${annee}-${semaine}-${version}.pdf`
      );
      document.body.appendChild(link);
      link.click();
    });
}

const SEMAINES_API = {
  // create,
  update,
  findOne,
  getAllByWeek,
  getPDF,
  getNumberSemainesEnAttente,
};

export default SEMAINES_API;
