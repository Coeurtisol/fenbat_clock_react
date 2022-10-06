import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HashRouter as Router,
  // Router,
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
import LoginForm from "./js/pages/LoginForm";
import AdminArticlesPage from "./js/pages/admin/AdminArticlesPage";
import GestionCommandePage from "./js/pages/GestionCommandePage";
import OverviewPage from "./js/pages/OverviewPage";
import PrivateRoute from "./js/components/route/PrivateRoute";
import PublicRoute from "./js/components/route/PublicRoute";
import ChefEquipeRoute from "./js/components/route/ChefEquipeRoute";
import RespRoute from "./js/components/route/RespRoute";
import RespSiteRoute from "./js/components/route/RespSiteRoute";

function App() {
  AUTH_API.setup();

  const [isSecure, setIsSecure] = useState(true);
  async function handleIsSecure() {
    const isSecureResponse = await AUTH_API.isSecure();
    setIsSecure(isSecureResponse);
  }
  useEffect(() => {
    handleIsSecure();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(
    AUTH_API.isAuthenticated()
  );
  const HeaderComponentWithRouter = withRouter(HeaderComponent);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div className="app">
        <div className="background bg-gris" />
        <Router>
          <HeaderComponentWithRouter />
          <Switch>
            {/* DECONNECTES */}
            <PublicRoute
              path="/loginpage"
              component={LoginForm}
              isSecure={isSecure}
            />
            {isSecure && (
              <PublicRoute
                path="/loginuserlist"
                component={Loginuserlist}
                isSecure={isSecure}
              />
            )}
            <PublicRoute path="/loginkeypad" component={Loginkeypad} />
            {!isAuthenticated && (
              <Route path="/">
                <Redirect to={isSecure ? "/loginuserlist" : "/loginpage"} />
              </Route>
            )}

            {/* CONNECTES */}
            <PrivateRoute
              path="/pointage/:year/:week"
              component={PointagePage}
            />
            <PrivateRoute path="/moncompte" component={MonComptePage} />

            {/* CHEFS D'EQUIPE */}
            <ChefEquipeRoute path="/commandes" component={CommandePage} />

            {/* RESPONSABLES */}
            <RespRoute path="/overview" component={OverviewPage} />
            <RespRoute path="/admin/users" component={AdminUsersPage} />
            <RespRoute path="/admin/affaires" component={AdminAffairesPage} />
            <RespRoute path="/admin/articles" component={AdminArticlesPage} />
            <RespRoute
              path="/gestion/pointage/:year/:week/:userId"
              component={PointagePage}
            />
            <RespRoute
              path="/gestion/pointage/:year/:week"
              component={GestionPointagePage}
            />
            <RespRoute
              path="/gestion/commandes"
              component={GestionCommandePage}
            />

            {/* RESPONSABLES SITE */}
            <RespSiteRoute path="/admin/roles" component={AdminRolesPage} />
            <RespSiteRoute path="/admin/entites" component={AdminEntitesPage} />
            <RespSiteRoute
              path="/admin/motifsAbsence"
              component={AdminMotifsAbsencePage}
            />

            {/* REDIRECTION */}
            <PrivateRoute exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
        <ToastContainer position="bottom-left" autoClose={2500} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
