import axios from "axios";
import { ETATSSEMAINE_API_URL } from "../configs/api_links";

async function getAll() {
  return await axios.get(ETATSSEMAINE_API_URL);
}

const ETATSSEMAINE_API = { getAll };

export default ETATSSEMAINE_API;
