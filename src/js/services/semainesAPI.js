import axios from "axios";
import { SEMAINES_API_URL } from "../configs/api_links";

async function create(semaine) {
  return await axios.post(SEMAINES_API_URL, semaine);
}

async function getAllByWeek(year, week) {
  return await axios.get(`${SEMAINES_API_URL}/gestion/${year}/${week}`);
}

async function findOne(year, week, userId) {
  return await axios.get(`${SEMAINES_API_URL}/${year}/${week}/${userId}`);
}

async function update(id, semaine) {
  return await axios.put(SEMAINES_API_URL + "/" + id, semaine);
}

const SEMAINES_API = { create, update, findOne, getAllByWeek };

export default SEMAINES_API;
