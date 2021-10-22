import "./css/App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./js/pages/HomePage";
import AdminWorkersPage from "./js/pages/AdminWorkersPage";
import HeaderComponent from "./js/components/HeaderComponent";

function App() {
  return (
    <div className="app">
      <div className="background bg-gris" />
      <div className="background bg-orange" />
      <Router>
        <HeaderComponent />
        <Switch>
          <Route path="/admin/workers" component={AdminWorkersPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
