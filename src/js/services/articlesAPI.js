import axios from "axios";
import { ARTICLES_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(ARTICLES_API_URL);
  return response.data;
}

async function create(article) {
  return await axios.post(ARTICLES_API_URL, article);
}

async function update(id, article) {
  return await axios.put(ARTICLES_API_URL + "/" + id, article);
}

async function deleteOne(id) {
  const response = await axios.delete(ARTICLES_API_URL + "/" + id);
  return response.data;
}

const ARTICLES_API = { create, update, deleteOne, findAll };

export default ARTICLES_API;
