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
  const [expenses, setExpenses] = useState(getFromLocalStorage("expenses", []));
  const [requirements, setRequirements] = useState(
    getFromLocalStorage("requirements", false)
  );

  useEffect(() => {
    setLocalStorage("budgetPerMonth", budgetPerMonth);
    setLocalStorage("budgetDetermined", budgetDetermined);
    setLocalStorage("expenses", expenses);
    setLocalStorage("requirements", requirements);
  }, [budgetPerMonth, budgetDetermined, expenses, requirements]);

  function addExpense(expense) {
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
  }

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
            addExpense={addExpense}
            requirements={requirements}
            setRequirements={setRequirements}
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
