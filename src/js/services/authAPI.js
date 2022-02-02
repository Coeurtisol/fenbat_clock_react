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
  login,
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
};

export default AUTH_API;
