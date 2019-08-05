import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { SignIn, SignUp } from "./components";

function ContentAuth(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Redirect to="/sign-in" />
      </Switch>
    </Router>
  );
}

export default ContentAuth;
