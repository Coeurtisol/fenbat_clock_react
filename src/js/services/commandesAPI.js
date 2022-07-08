import axios from "axios";
import { COMMANDES_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(COMMANDES_API_URL);
  return response.data;
}

async function findAllByUser(id) {
  const response = await axios.get(COMMANDES_API_URL + "/user/" + id);
  return response.data;
}

async function getNumberCommandesEnAttente() {
  const response = await axios.get(COMMANDES_API_URL + "/enattente");
  return response.data;
}

async function create(commande) {
  return await axios.post(COMMANDES_API_URL, commande);
}

async function changerEtat(id, etat) {
  return await axios.put(COMMANDES_API_URL + "/" + id, { etat });
}

async function deleteOne(id) {
  const response = await axios.delete(COMMANDES_API_URL + "/" + id);
  return response.data;
}

const COMMANDES_API = {
  create,
  changerEtat,
  deleteOne,
  findAll,
  findAllByUser,
  getNumberCommandesEnAttente,
};

export default COMMANDES_API;
