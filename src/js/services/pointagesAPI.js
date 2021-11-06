import axios from "axios";
import { POINTAGES_API_URL } from "../configs/api_links";

async function create({ userId, pointageDebut }) {
  return await axios.post(POINTAGES_API_URL, { userId, pointageDebut });
}

async function update({ id, pointageFin }) {
  return await axios.put(POINTAGES_API_URL + "/" + id, { pointageFin });
}

const POINTAGES_API = { create, update };

export default POINTAGES_API;
