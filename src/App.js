import "./css/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./js/pages/HomePage";
import AdminUsersPage from "./js/pages/admin/AdminUsersPage";
import AdminEntitesPage from "./js/pages/admin/AdminEntitesPage";
import AdminMotifsAbsencePage from "./js/pages/admin/AdminMotifsAbsencePage";
import AdminAffairesPage from "./js/pages/admin/AdminAffairesPage";
import AdminEtatsAffairePage from "./js/pages/admin/AdminEtatsAffairePage";
import AdminSecteursAffairePage from "./js/pages/admin/AdminSecteursAffairePage";
import AdminTypesAffairePage from "./js/pages/admin/AdminTypesAffairePage";
import HeaderComponent from "./js/components/HeaderComponent";
import PointagePage from "./js/pages/PointagePage";
import AccueilPage from "./js/pages/AccueilPage";
import LoginPage from "./js/pages/LoginPage";

function App() {
  return (
    <div className="app">
      <div className="background bg-gris" />
      {/* <div className="background bg-orange" /> */}
      {/* <div className="container"> */}
      <Router>
        <HeaderComponent />
        <Switch>
          <Route path="/admin/users" component={AdminUsersPage} />
          <Route path="/admin/entites" component={AdminEntitesPage} />
          <Route path="/admin/motifsAbsence" component={AdminMotifsAbsencePage} />
          <Route path="/admin/affaires" component={AdminAffairesPage} />
          {/* <Route path="/admin/etatsAffaire" component={AdminEtatsAffairePage} /> */}
          <Route path="/admin/secteursAffaire" component={AdminSecteursAffairePage} />
          <Route path="/admin/typesAffaire" component={AdminTypesAffairePage} />
          {/* <Route path="/pointage" component={PointagePage}/> */}
          <Route path="/accueil" component={AccueilPage}/>
          <Route path="/connexion" component={LoginPage}/>
          {/* <Route path="/commandes" /> */}
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
      {/* </div> */}
    </div>
  );
}

export default App;
