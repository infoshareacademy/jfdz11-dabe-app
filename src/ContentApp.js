import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Navigation, Profile } from "./components";
import { Dashboard, Review, Finances, SharedBudgets } from "./scenes";

function ContentApp(props) {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/review" component={Review} />
        <Route exact path="/finances" component={Finances} />
        <Route exact path="/shared" component={SharedBudgets} />
        <Route exact path="/profile" component={Profile} />
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

export default ContentApp;
