import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { SignIn, SignUp } from "./components";
import { NoMatch } from "./scenes";

function ContentAuth(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Redirect exact from="/" to="/sign-in" />
        <Redirect exact from="/dashboard" to="/sign-in" />
        <Redirect exact from="/review" to="/sign-in" />
        <Redirect exact from="/summary" to="/sign-in" />
        <Redirect exact from="/report" to="/sign-in" />
        <Redirect exact from="/profile" to="/sign-in" />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default ContentAuth;
