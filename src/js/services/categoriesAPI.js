import axios from "axios";
import { CATEGORIES_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(CATEGORIES_API_URL);
  return response.data;
}

async function create(categorie) {
  return await axios.post(CATEGORIES_API_URL, categorie);
}

async function update(id, categorie) {
  return await axios.put(CATEGORIES_API_URL + "/" + id, categorie);
}

async function deleteOne(id) {
  const response = await axios.delete(CATEGORIES_API_URL + "/" + id);
  return response.data;
}

const CATEGORIES_API = { create, update, deleteOne, findAll };

export default CATEGORIES_API;
