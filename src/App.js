import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Navigation } from "./components";
import { Dashboard, Review, Summary, Report, NoMatch } from "./scenes";
import uuid from "uuid/v4";

function App(props) {
  const [expenses, setExpenses] = useState(
    getFromLocalStorage("expenses", initialExpenses)
  );
  const [budgetPerMonth, setBudgetPerMonth] = useState(
    getFromLocalStorage("budgetPerMonth", 0)
  );
  const [budgetDetermined, setBudgetDetermined] = useState(
    getFromLocalStorage("budgetDetermined", false)
  );
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

  function removeExpense(expenseID) {
    const newExpenses = expenses.filter(expens => expens.id !== expenseID);
    setExpenses(newExpenses);
  }

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard
            expenses={expenses}
            budgetPerMonth={budgetPerMonth}
            setBudgetPerMonth={setBudgetPerMonth}
            budgetDetermined={budgetDetermined}
            setBudgetDetermined={setBudgetDetermined}
            requirements={requirements}
            setRequirements={setRequirements}
            onAddExpense={addExpense}
            onRemoveExpense={removeExpense}
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

const initialExpenses = [
  {
    id: uuid(),
    cost: 80,
    date: "2.07.2019",
    category: "HealthAndBeauty",
    title: "Joga."
  },
  {
    id: uuid(),
    cost: 50,
    date: "3.07.2019",
    category: "Food",
    title: "SurfBurger."
  },
  {
    id: uuid(),
    cost: 80,
    date: "1.07.2019",
    category: "Entertainment",
    title: "CinemaCity: Avangers - End Game."
  },
  {
    id: uuid(),
    cost: 45,
    date: "2.07.2019",
    category: "House",
    title: "Door handles replacement."
  },
  {
    id: uuid(),
    cost: 120,
    date: "4.07.2019",
    category: "Clothing",
    title: "New hat."
  }
];
