import axios from "axios";
import { CLIENTSAFFAIRE_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(CLIENTSAFFAIRE_API_URL);
  return response.data;
}

async function create(clientAffaire) {
  return await axios.post(CLIENTSAFFAIRE_API_URL, clientAffaire);
}

async function update(id, clientAffaire) {
  return await axios.put(CLIENTSAFFAIRE_API_URL + "/" + id, clientAffaire);
}

async function deleteOne(id) {
  const response = await axios.delete(CLIENTSAFFAIRE_API_URL + "/" + id);
  return response.data;
}

const CLIENTSAFFAIRE_API = { create, update, deleteOne, findAll };

export default CLIENTSAFFAIRE_API;
