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

async function create(commande) {
  return await axios.post(COMMANDES_API_URL, commande);
}

async function valider(id) {
  return await axios.put(COMMANDES_API_URL + "/" + id);
}

async function deleteOne(id) {
  const response = await axios.delete(COMMANDES_API_URL + "/" + id);
  return response.data;
}

const COMMANDES_API = { create, valider, deleteOne, findAll, findAllByUser };

export default COMMANDES_API;
