import axios from "axios";
import { USERS_API_URL } from "../configs/api_links";

async function findOne(id) {
  const response = await axios.get(USERS_API_URL + "/" + id);
  return response.data;
}

async function findAll() {
  const response = await axios.get(USERS_API_URL);
  return response.data;
}

async function getAllActive() {
  const response = await axios.get(USERS_API_URL +"/activeuserlist");
  return response.data;
}

async function create(user) {
  const response = await axios.post(USERS_API_URL, user);
  return response.data;
}

async function update(id, user) {
  const response = await axios.put(USERS_API_URL + "/" + id, user);
  return response.data;
}

async function deleteOne(id) {
  const response = await axios.delete(USERS_API_URL + "/" + id);
  return response.data;
}

// async function findAllByDay(date) {
//   const response = await axios.get(USERS_API_URL + "/pointages/" + date)
//   return response.data;
// }

const USERS_API = { findOne, findAll, getAllActive, create, update, deleteOne };

export default USERS_API;
