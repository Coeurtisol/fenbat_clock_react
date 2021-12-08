import axios from "axios";
import { PERMISSIONS_API_URL } from "../configs/api_links";

async function getAll() {
  const res = await axios.get(PERMISSIONS_API_URL);
  return res.data;
}

const PERMISSIONS_API = { getAll };

export default PERMISSIONS_API;
