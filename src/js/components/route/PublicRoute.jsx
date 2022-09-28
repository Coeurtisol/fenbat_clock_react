import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    !isAuthenticated && (
      <Route render={(props) => <Component {...props} {...rest} />} />
    )
  );
};

export default PublicRoute;
