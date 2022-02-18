import axios from "axios";
import { AUTH_API_URL } from "../configs/api_links";

async function isSecure() {
  const res = await axios.get(AUTH_API_URL + "/issecure");
  return res.data.isSecure;
}

async function login(credentials) {
  const response = await axios.post(AUTH_API_URL + "/login", credentials);
  const token = response.data;
  if (typeof token == "string") {
    window.localStorage.setItem("authToken", token);
    setAxiosToken(token);
  }
  return response;
}

async function externalLogin(credentials) {
  const response = await axios.post(
    AUTH_API_URL + "/externalLogin",
    credentials
  );
  const token = response.data;
  if (typeof token == "string") {
    window.localStorage.setItem("authToken", token);
    setAxiosToken(token);
  }
  return response;
}

function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function setup() {
  const token = getToken();
  if (isTokenValid(token)) {
    setAxiosToken(token);
  }
}

function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function getToken() {
  return window.localStorage.getItem("authToken");
}

function parseJwt(token) {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}

function isTokenValid(token) {
  if (token) {
    const jwtData = parseJwt(token);
    return jwtData.exp * 1000 > new Date().getTime();
  }
  return false;
}

function isAuthenticated() {
  const token = getToken();
  return isTokenValid(token);
}

function getId() {
  if (isAuthenticated()) {
    const token = getToken();
    const jwtData = parseJwt(token);
    return jwtData.id;
  }
}

function getRoleId() {
  if (isAuthenticated()) {
    const token = getToken();
    const jwtData = parseJwt(token);
    return jwtData.role.id;
  }
}

function getPermissionId() {
  if (isAuthenticated()) {
    const token = getToken();
    const jwtData = parseJwt(token);
    return jwtData.role.permissionId;
  }
}

function getRole() {
  if (isAuthenticated()) {
    const token = getToken();
    const jwtData = parseJwt(token);
    return jwtData.role.name;
  }
}

function getEntite() {
  if (isAuthenticated()) {
    const token = getToken();
    const jwtData = parseJwt(token);
    return jwtData.entite ? jwtData.entite.name : null;
  }
}

function getFullName() {
  if (isAuthenticated()) {
    const token = getToken();
    const jwtData = parseJwt(token);
    return `${jwtData.firstname} ${jwtData.lastname}`;
  }
}

function getValidationLevel() {
  const permissionId = getPermissionId();
  // resp site => valid resp site
  if (permissionId == 1) return 4;
  // resp prod => valid resp prod
  else if (permissionId == 2) return 3;
  // chef equipe ou => attente de validation
  else return 2;
}

function peutValider(semaineEtatId) {
  const validationLevel = getValidationLevel();
  if (semaineEtatId == 1 || semaineEtatId == 5) return true;
  else if (semaineEtatId < validationLevel) return true;
  else return false;
}

const AUTH_API = {
  setup,
  login,
  externalLogin,
  logout,
  isAuthenticated,
  getId,
  getRole,
  getRoleId,
  getPermissionId,
  getEntite,
  getFullName,
  getValidationLevel,
  peutValider,
  isSecure,
};

export default AUTH_API;
