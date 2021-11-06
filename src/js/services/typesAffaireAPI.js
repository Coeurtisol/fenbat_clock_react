import axios from "axios";
import { TYPESAFFAIRE_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(TYPESAFFAIRE_API_URL);
  return response.data;
}

async function create( typeAffaire ) {
  return await axios.post(TYPESAFFAIRE_API_URL, typeAffaire );
}

async function update( id, typeAffaire ) {
  return await axios.put(TYPESAFFAIRE_API_URL + "/" + id, typeAffaire );
}

async function deleteOne(id) {
  const response = await axios.delete(TYPESAFFAIRE_API_URL + "/" + id);
  return response.data;
}

const TYPESAFFAIRE_API = { create, update, deleteOne, findAll };

export default TYPESAFFAIRE_API;
