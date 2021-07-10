import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGlobalState } from "../../state/provider";
import { token } from "../../env/env";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ profile }, dispatch] = useGlobalState();
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  return (
    <Route
      {...rest}
      render={(props) =>
        profile !== null ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
