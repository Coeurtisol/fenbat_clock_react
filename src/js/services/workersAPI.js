import axios from "axios";
import { WORKERS_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(WORKERS_API_URL);
  return response.data;
}

async function create(worker) {
  const response = await axios.post(WORKERS_API_URL, worker)
  return response.data;
}

async function deleteOne(id) {
  const response = await axios.delete(WORKERS_API_URL + "/" + id)
  return response.data;
}

async function findAllByDay(date) {
  const response = await axios.get(WORKERS_API_URL + "/workSessions/" + date)
  return response.data;
}

const WORKERS_API = { findAll, create, deleteOne, findAllByDay }

export default WORKERS_API;
