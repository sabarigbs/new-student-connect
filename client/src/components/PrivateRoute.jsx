import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return(<Route
    {...rest}
    render={props => {
        var user = JSON.parse(window.localStorage.getItem("user"));
      if (user !== null && user.isLoggedIn) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location
              }
            }}
          />
        );
      }
    }}
  />
  );
};
