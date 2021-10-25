import axios from "axios";
import { WORKSESSIONS_API_URL } from "../configs/api_links";

async function create({ workerId, sessionStart }) {
  return await axios.post(WORKSESSIONS_API_URL, { workerId, sessionStart });
}

async function update({ id, sessionEnd }) {
  return await axios.put(WORKSESSIONS_API_URL + "/" + id, { sessionEnd });
}

const WORKSESSIONS_API = { create, update };

export default WORKSESSIONS_API;
