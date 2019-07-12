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
  const [selectedMonth, setSelectedMonth] = useState({
    date: new Date(),
    monthYear: new Date().toLocaleDateString().slice(-7)
  });

  const [expenses, setExpenses] = useState(
    getFromLocalStorage("expenses", initialExpenses())
  );

  useEffect(() => {
    setLocalStorage("expenses", expenses);
  }, [expenses]);

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
      <Navigation
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard
            selectedMonth={selectedMonth}
            expenses={expenses}
            onAddExpense={addExpense}
            onRemoveExpense={removeExpense}
            setExpenses={setExpenses}
          />
        </Route>
        <Route exact path="/review">
          <Review
            selectedMonth={selectedMonth}
            expenses={expenses}
            onRemoveExpense={removeExpense}
          />
        </Route>
        <Route exact path="/summary" component={Summary} />
        <Route exact path="/report">
          <Report />
        </Route>
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

function initialExpenses() {
  const categories = [
    "Food",
    "Entertainment",
    "Car",
    "House",
    "Clothing",
    "Electronics",
    "HealthAndBeauty"
  ];
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  return Array(200)
    .fill(1)
    .map(item => {
      const date = new Date(
        new Date(2019, 0, 1).getTime() +
          Math.random() *
            (new Date(2019, 7, 31).getTime() - new Date(2019, 0, 1).getTime())
      )
        .toISOString()
        .slice(0, 10);
      const obj = {
        id: uuid(),
        cost: Math.round(Math.random() * 500),
        date,
        monthYear: date
          .split("-")
          .reverse()
          .join(".")
          .slice(3),
        category: categories[Math.round(Math.random() * 6.5)],
        title: Array(5)
          .fill(null)
          .map(i => alphabet[Math.round(Math.random() * 26.5)])
          .join(""),
        budgetPerMonth: 0,
        desc: false
      };
      return obj;
    });
}
