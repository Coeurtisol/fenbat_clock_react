import axios from "axios";
import { POINTAGES_API_URL } from "../configs/api_links";

async function overview(date) {
  const res = await axios.post(POINTAGES_API_URL + "/overview", date);
  return res.data;
}

async function create(pointages) {
  return await axios.post(POINTAGES_API_URL, pointages);
}

async function update({ id, pointages }) {
  return await axios.put(POINTAGES_API_URL + "/" + id, pointages);
}

const POINTAGES_API = { create, update, overview };

export default POINTAGES_API;
