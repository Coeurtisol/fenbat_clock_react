import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
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
import AdminUsersPage from "./js/pages/admin/AdminUsersPage";
import AdminEntitesPage from "./js/pages/admin/AdminEntitesPage";
import AdminMotifsAbsencePage from "./js/pages/admin/AdminMotifsAbsencePage";
import AdminAffairesPage from "./js/pages/admin/AdminAffairesPage";
import HeaderComponent from "./js/components/HeaderComponent";
import PointagePage from "./js/pages/PointagePage";
import Loginuserlist from "./js/pages/Loginuserlist";
import Loginkeypad from "./js/pages/Loginkeypad";
import CommandePage from "./js/pages/CommandePage";
import NotFoundPage from "./js/pages/NotFoundPage";
import PrivateRoute from "./js/components/PrivateRoute";
import PublicRoute from "./js/components/PublicRoute";

function App() {
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
            <PublicRoute path="/loginuserlist" component={Loginuserlist} />
            <PublicRoute path="/loginkeypad" component={Loginkeypad} />
            {!isAuthenticated && (
              <Route path="/">
                <Redirect to="/loginuserlist" />
              </Route>
            )}

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
            <PrivateRoute path="/pointage" component={PointagePage} />
            <PrivateRoute path="/commandes" component={CommandePage} />
            <PrivateRoute exact path="/" component={HomePage} />

            <Route component={NotFoundPage} />
          </Switch>
        </Router>
        {/* </div> */}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
