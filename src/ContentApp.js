import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Navigation, Profile } from "./components";
import { Dashboard, Review, Summary, Report, NoMatch } from "./scenes";

function ContentApp(props) {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/review" component={Review} />
        <Route exact path="/summary" component={Summary} />
        <Route exact path="/report" component={Report} />
        <Route exact path="/profile" component={Profile} />
        <Redirect exact from="/" to="/dashboard" />
        <Redirect exact from="/sign-in" to="/dashboard" />
        <Redirect exact from="/sign-up" to="/dashboard" />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default ContentApp;
