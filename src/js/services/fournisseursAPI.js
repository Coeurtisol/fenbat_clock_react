import axios from "axios";
import { FOURNISSEURS_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(FOURNISSEURS_API_URL);
  return response.data;
}

async function create(fournisseur) {
  return await axios.post(FOURNISSEURS_API_URL, fournisseur);
}

async function update(id, fournisseur) {
  return await axios.put(FOURNISSEURS_API_URL + "/" + id, fournisseur);
}

async function deleteOne(id) {
  const response = await axios.delete(FOURNISSEURS_API_URL + "/" + id);
  return response.data;
}

const FOURNISSEURS_API = { create, update, deleteOne, findAll };

export default FOURNISSEURS_API;
