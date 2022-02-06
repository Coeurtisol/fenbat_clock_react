import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import AuthContext from "./js/contexts/AuthContext";
import AUTH_API from "./js/services/authAPI";
import HomePage from "./js/pages/HomePage";
import MonComptePage from "./js/pages/MonComptePage";
import AdminRolesPage from "./js/pages/admin/AdminRolesPage";
import AdminUsersPage from "./js/pages/admin/AdminUsersPage";
import AdminEntitesPage from "./js/pages/admin/AdminEntitesPage";
import AdminMotifsAbsencePage from "./js/pages/admin/AdminMotifsAbsencePage";
import AdminAffairesPage from "./js/pages/admin/AdminAffairesPage";
import HeaderComponent from "./js/components/HeaderComponent";
import PointagePage from "./js/pages/PointagePage";
import GestionPointagePage from "./js/pages/GestionPointagePage";
import Loginuserlist from "./js/pages/Loginuserlist";
import Loginkeypad from "./js/pages/Loginkeypad";
import CommandePage from "./js/pages/CommandePage";
import NotFoundPage from "./js/pages/NotFoundPage";
import PrivateRoute from "./js/components/PrivateRoute";
import PublicRoute from "./js/components/PublicRoute";

function App() {
  // let ip;
  // async function setIp() {
  //   const ip = await AUTH_API.getIp();
  //   console.log(ip);
  // }
  // setIp();
  // console.log(ip);

  const [isAuthenticated, setIsAuthenticated] = useState(
    AUTH_API.isAuthenticated()
  );
  const HeaderComponentWithRouter = withRouter(HeaderComponent);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div className="app">
        <div className="background bg-gris" />
        {/* <div className="background bg-orange" /> */}
        {/* <div className="container"> */}
        <Router>
          <HeaderComponentWithRouter />
          <Switch>
            {/* <PublicRoute path="/loginuserlist" component={Loginuserlist} /> */}
            <PublicRoute path="/loginuserlist" component={Loginuserlist} />
            <PublicRoute path="/loginkeypad" component={Loginkeypad} />
            {!isAuthenticated && (
              <Route path="/">
                <Redirect to="/loginuserlist" />
              </Route>
            )}

            <PrivateRoute path="/admin/roles" component={AdminRolesPage} />
            <PrivateRoute path="/admin/users" component={AdminUsersPage} />
            <PrivateRoute path="/admin/entites" component={AdminEntitesPage} />
            <PrivateRoute
              path="/admin/affaires"
              component={AdminAffairesPage}
            />
            <PrivateRoute
              path="/admin/motifsAbsence"
              component={AdminMotifsAbsencePage}
            />
            <PrivateRoute
              path="/gestion/pointage/:year/:week/:userId"
              component={PointagePage}
            />
            <PrivateRoute
              path="/gestion/pointage/:year/:week"
              component={GestionPointagePage}
            />
            <PrivateRoute
              path="/pointage/:year/:week"
              component={PointagePage}
            />
            <PrivateRoute path="/commandes" component={CommandePage} />
            <PrivateRoute path="/moncompte" component={MonComptePage} />
            <PrivateRoute exact path="/" component={HomePage} />

            <Route component={NotFoundPage} />
          </Switch>
        </Router>
        {/* </div> */}
        <ToastContainer position="bottom-left" autoClose={2500} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
