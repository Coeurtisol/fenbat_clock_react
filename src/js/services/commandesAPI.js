import axios from "axios";
import { COMMANDES_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(COMMANDES_API_URL);
  return response.data;
}

async function create(commande) {
  return await axios.post(COMMANDES_API_URL, commande);
}

async function update(id, commande) {
  return await axios.put(COMMANDES_API_URL + "/" + id, commande);
}

async function deleteOne(id) {
  const response = await axios.delete(COMMANDES_API_URL + "/" + id);
  return response.data;
}

const COMMANDES_API = { create, update, deleteOne, findAll };

export default COMMANDES_API;
