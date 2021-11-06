import axios from "axios";
import { ENTITES_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(ENTITES_API_URL);
  return response.data;
}

async function create(entite) {
  return await axios.post(ENTITES_API_URL, entite);
}

async function update(id, entite) {
  return await axios.put(ENTITES_API_URL + "/" + id, entite);
}

async function deleteOne(id) {
  const response = await axios.delete(ENTITES_API_URL + "/" + id);
  return response.data;
}

const ENTITES_API = { create, update, deleteOne, findAll };

export default ENTITES_API;
