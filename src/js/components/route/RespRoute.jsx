import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";
import AUTH_API from "../../services/authAPI";

const RespRoute = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated && AUTH_API.estResp() ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default RespRoute;
