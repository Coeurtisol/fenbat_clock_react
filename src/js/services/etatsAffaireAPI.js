import axios from "axios";
import { ETATSAFFAIRE_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(ETATSAFFAIRE_API_URL);
  return response.data;
}

// async function create(etatAffaire) {
//   return await axios.post(ETATSAFFAIRE_API_URL, etatAffaire);
// }

// async function update(id, etatAffaire) {
//   return await axios.put(ETATSAFFAIRE_API_URL + "/" + id, etatAffaire);
// }

// async function deleteOne(id) {
//   const response = await axios.delete(ETATSAFFAIRE_API_URL + "/" + id);
//   return response.data;
// }

const ETATSAFFAIRE_API = { findAll };

export default ETATSAFFAIRE_API;
