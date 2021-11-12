import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Route } from "react-router-dom";

const PublicRoute = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated && <Route path={path} component={component} />;
};

export default PublicRoute;
