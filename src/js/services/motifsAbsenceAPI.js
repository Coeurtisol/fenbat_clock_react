import axios from "axios";
import { MOTIFSABSENCE_API_URL } from "../configs/api_links";

async function findAll() {
  const response = await axios.get(MOTIFSABSENCE_API_URL);
  return response.data;
}

async function create(motifAbsence) {
  return await axios.post(MOTIFSABSENCE_API_URL, motifAbsence);
}

async function update(id, motifAbsence) {
  return await axios.put(MOTIFSABSENCE_API_URL + "/" + id, motifAbsence);
}

async function deleteOne(id) {
  const response = await axios.delete(MOTIFSABSENCE_API_URL + "/" + id);
  return response.data;
}

const MOTIFSABSENCE_API = { create, update, deleteOne, findAll };

export default MOTIFSABSENCE_API;
