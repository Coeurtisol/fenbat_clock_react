import axios from "axios";
import { USERS_API_URL } from "../configs/api_links";

// LOGIN
async function login(credentials) {
  const response = await axios.post(USERS_API_URL + "/auth/login", credentials);
  const token = response.data;

  //on stocke le token dans le localstorage
  // window.localStorage.setItem("authToken", token);

  //on met un header par défaut sur les future requêtes
  //axios.defaults.headers["Authorization"] = "Bearer " + token;

  return response;
}

// function logout() {
//     window.localStorage.removeItem("authToken");
//     delete axios.defaults.headers["Authorization"];
// }

// DECODE TOKEN
function parseJwt(token) {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}

// function getToken() {
//     return window.localStorage.getItem("authToken");
// }

const AUTH_API = { login };

export default AUTH_API;

// //Permet de voir si on est authentifié ou pas
// function isAuthenticated() {

//     const token = getToken();

//     // voir si token encore valide
//     if (token) {

//         const jwtData = jwtDecode(token);
//         return jwtData.exp * 1000 > new Date().getTime();

//     }
//     return false;
// }

// function getUserId() {
//     if (isAuthenticated()) {
//         return jwtDecode(getToken()).id;
//     }
// }

// function isAdmin() {
//     if (isAuthenticated()) {

//         const roles = jwtDecode(getToken()).roles;

//         return !!roles.includes('ROLE_ADMIN');
//     }
// }

// function isRole() {
//     let role = "";
//     if (isAuthenticated()) {

//         if (isAdmin())
//         {
//             role = "Administrateur";
//         }
//         else
//         {
//             role = "Utilisateur";
//         }
//     }
//     return role;
// }



// function setup() {
//     const token = getToken();

//     if (token) {
//         const jwtData = jwtDecode(token);
//         if (jwtData.exp * 1000 > new Date().getTime()) {
//             setAxiosToken(token);
//             return true;
//         } else {
//             return false;
//         }
//     } else {
//         return false;
//     }
// }


// export default {
//     authenticate,
//     isAuthenticated,
//     logout,
//     setup,
//     getUserFirstname,
//     getUserLastName,
//     getUserFirstNameLastName,
//     getUserId,
//     getUsername,
//     isAdmin,
//     getUserActiveStatus,
//     isRole
// }
