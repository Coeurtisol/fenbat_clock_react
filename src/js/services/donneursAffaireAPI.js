import axios from "axios";
import { DONNEURSAFFAIRE_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(DONNEURSAFFAIRE_API_URL);
  return response.data;
}

async function create(donneurAffaire) {
  return await axios.post(DONNEURSAFFAIRE_API_URL, donneurAffaire);
}

async function update(id, donneurAffaire) {
  return await axios.put(DONNEURSAFFAIRE_API_URL + "/" + id, donneurAffaire);
}

async function deleteOne(id) {
  const response = await axios.delete(DONNEURSAFFAIRE_API_URL + "/" + id);
  return response.data;
}

const DONNEURSAFFAIRE_API = { create, update, deleteOne, findAll };

export default DONNEURSAFFAIRE_API;
