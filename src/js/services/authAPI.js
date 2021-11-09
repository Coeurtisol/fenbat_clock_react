import axios from "axios";
import { USERS_API_URL } from "../configs/api_links";

async function login(credentials) {
  const response = await axios.post(USERS_API_URL + "/auth/login", credentials);
  const token = response.data;

  window.localStorage.setItem("authToken", token);

  //axios.defaults.headers["Authorization"] = "Bearer " + token;

  return response;
}

function logout() {
  window.localStorage.removeItem("authToken");
  // delete axios.defaults.headers["Authorization"];
}

function parseJwt(token) {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}

function getToken() {
  return window.localStorage.getItem("authToken");
}

function isAuthenticated() {
  const token = getToken();
  if (token) {
    const jwtData = parseJwt(token);
    return jwtData.exp * 1000 > new Date().getTime();
  }
  return false;
}

function getRole() {
  if (isAuthenticated()) {
    const token = getToken();
    const jwtData = parseJwt(token);
    return jwtData.role.name;
  }
}

const AUTH_API = { login, logout, isAuthenticated, getRole };

export default AUTH_API;
