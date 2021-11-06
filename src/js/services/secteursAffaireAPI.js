import axios from "axios";
import { SECTEURSAFFAIRE_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(SECTEURSAFFAIRE_API_URL);
  return response.data;
}

async function create(secteurAffaire) {
  return await axios.post(SECTEURSAFFAIRE_API_URL, secteurAffaire);
}

async function update(id, secteurAffaire) {
  return await axios.put(SECTEURSAFFAIRE_API_URL + "/" + id, secteurAffaire);
}

async function deleteOne(id) {
  const response = await axios.delete(SECTEURSAFFAIRE_API_URL + "/" + id);
  return response.data;
}

const SECTEURSAFFAIRE_API = { create, update, deleteOne, findAll };

export default SECTEURSAFFAIRE_API;
