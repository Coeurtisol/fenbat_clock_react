import axios from "axios";
import { POINTAGES_API_URL } from "../configs/api_links";

async function create( pointages ) {
  return await axios.post(POINTAGES_API_URL, pointages );
}

async function update({ id, pointages }) {
  return await axios.put(POINTAGES_API_URL + "/" + id,  pointages );
}

const POINTAGES_API = { create, update };

export default POINTAGES_API;
