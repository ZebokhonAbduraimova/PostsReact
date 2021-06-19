import React from "react";
import { useGlobalContext } from "../../context/context";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ renderComponent: Component, ...rest }) => {
  const [{ auth }] = useGlobalContext();

  if (localStorage.getItem("jwt")) {
    if (!auth.user) {
      return <div className="container">Loading...</div>;
    } else {
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
