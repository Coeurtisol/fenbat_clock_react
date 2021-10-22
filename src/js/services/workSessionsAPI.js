import axios from "axios";
import { WORKSESSIONS_API_URL } from "../configs/api_links";

async function create(workerSessions) {
  return await axios.post(WORKSESSIONS_API_URL, workerSessions);
}

async function update(id) {
  return await axios.put(WORKSESSIONS_API_URL + "/" + id);
}

async function deleteOne(id) {
  return await axios.delete(WORKSESSIONS_API_URL + "/" + id);
}

const WORKSESSIONS_API = { create, update, deleteOne };

export default WORKSESSIONS_API;
