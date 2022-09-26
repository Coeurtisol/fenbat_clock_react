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
import PrivateRoute from "./js/components/PrivateRoute";
import PublicRoute from "./js/components/PublicRoute";
import LoginForm from "./js/pages/LoginForm";
import AdminArticlesPage from "./js/pages/admin/AdminArticlesPage";
import GestionCommandePage from "./js/pages/GestionCommandePage";
import OverviewPage from "./js/pages/OverviewPage";

function App() {
  AUTH_API.setup();

  const [isSecure, setIsSecure] = useState(true);
  async function handleIsSecure() {
    const isSecureResponse = await AUTH_API.isSecure();
    setIsSecure(isSecureResponse);
  }
  // useEffect(() => {
  //   handleIsSecure();
  // }, []);

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
            <PrivateRoute path="/overview" component={OverviewPage} />
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
              path="/admin/articles"
              component={AdminArticlesPage}
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
              path="/gestion/commandes"
              component={GestionCommandePage}
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
        <ToastContainer position="bottom-left" autoClose={2500} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
