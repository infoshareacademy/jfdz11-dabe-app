import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components";
import Summary from "./scenes/Summary/Summary";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/operations" component={Summary} />
        <Route exact path="/review" component={Summary} />
        <Route exact path="/summary" component={Summary} />
        <Route exact path="/report" component={Summary} />
      </Switch>
    </Router>
  );
}

export default App;
