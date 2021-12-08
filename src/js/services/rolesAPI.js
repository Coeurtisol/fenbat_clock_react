import axios from "axios";
import { ROLES_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(ROLES_API_URL);
  return response.data;
}

async function create(role) {
  return await axios.post(ROLES_API_URL, role);
}

async function update(id, role) {
  return await axios.put(ROLES_API_URL + "/" + id, role);
}

async function deleteOne(id) {
  const response = await axios.delete(ROLES_API_URL + "/" + id);
  return response.data;
}

const ROLES_API = { create, update, deleteOne, findAll };

export default ROLES_API;
