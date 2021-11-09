import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import AuthContext from "./js/contexts/AuthContext";
import AUTH_API from "./js/services/authAPI";
import HomePage from "./js/pages/HomePage";
import AdminUsersPage from "./js/pages/admin/AdminUsersPage";
import AdminEntitesPage from "./js/pages/admin/AdminEntitesPage";
import AdminMotifsAbsencePage from "./js/pages/admin/AdminMotifsAbsencePage";
import AdminAffairesPage from "./js/pages/admin/AdminAffairesPage";
// import AdminSecteursAffaireComponent from "./js/pages/admin/AdminSecteursAffaireComponent";
// import AdminSecteursAffaireComponent from "./js/pages/admin/AdminSecteursAffaireComponent";
import HeaderComponent from "./js/components/HeaderComponent";
// import PointagePage from "./js/pages/PointagePage";
import Loginuserlist from "./js/pages/Loginuserlist";
import Loginkeypad from "./js/pages/Loginkeypad";
import CommandePage from "./js/pages/CommandePage";

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
            <Route path="/admin/users" component={AdminUsersPage} />
            <Route path="/admin/entites" component={AdminEntitesPage} />
            <Route
              path="/admin/motifsAbsence"
              component={AdminMotifsAbsencePage}
            />
            <Route path="/admin/affaires" component={AdminAffairesPage} />
            {/* <Route
              path="/admin/secteursAffaire"
              component={AdminSecteursAffaireComponent}
            /> */}
            {/* <Route
              path="/admin/typesAffaire"
              component={AdminSecteursAffaireComponent}
            /> */}
            {/* <Route path="/pointage" component={PointagePage}/> */}
            <Route path="/loginuserlist" component={Loginuserlist} />
            <Route path="/loginkeypad" component={Loginkeypad} />
            <Route path="/commandes" component={CommandePage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
        {/* </div> */}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
