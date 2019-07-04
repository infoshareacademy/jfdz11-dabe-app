import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Navigation } from "./components";
import { Dashboard, Review, Summary, Report, NoMatch } from "./scenes";

function App(props) {
  const [budgetPerMonth, setBudgetPerMonth] = useState(
    getFromLocalStorage("budgetPerMonth", 0)
  );
  const [budgetDetermined, setBudgetDetermined] = useState(
    getFromLocalStorage("budgetDetermined", false)
  );
  const [expenses, setExpenses] = useState(
    getFromLocalStorage("budgetPerMonth", [
      {
        id: "",
        cost: 0,
        category: "",
        date: "",
        title: ""
      }
    ])
  );

  useEffect(() => {
    setLocalStorage("budgetPerMonth", budgetPerMonth);
    setLocalStorage("budgetDetermined", budgetDetermined);
  }, [budgetPerMonth, budgetDetermined]);

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard
            budgetPerMonth={budgetPerMonth}
            setBudgetPerMonth={setBudgetPerMonth}
            budgetDetermined={budgetDetermined}
            setBudgetDetermined={setBudgetDetermined}
          />
        </Route>
        <Route exact path="/review" component={Review} />
        <Route exact path="/summary" component={Summary} />
        <Route exact path="/report" component={Report} />
        <Redirect exact from="/" to="/dashboard" />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;

function getFromLocalStorage(key, value) {
  if (JSON.parse(localStorage.getItem(key) === null)) return value;
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
