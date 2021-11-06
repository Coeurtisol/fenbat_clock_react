import axios from "axios";
import { AFFAIRES_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(AFFAIRES_API_URL);
  return response.data;
}

async function create(affaire) {
  return await axios.post(AFFAIRES_API_URL, affaire);
}

async function update(id, affaire) {
  return await axios.put(AFFAIRES_API_URL + "/" + id, affaire);
}

async function deleteOne(id) {
  const response = await axios.delete(AFFAIRES_API_URL + "/" + id);
  return response.data;
}

const AFFAIRES_API = { create, update, deleteOne, findAll };

export default AFFAIRES_API;
