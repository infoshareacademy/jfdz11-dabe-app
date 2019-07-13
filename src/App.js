import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Navigation } from "./components";
import { Dashboard, Review, Summary, Report, NoMatch } from "./scenes";
import { budgetsRef, expensesRef } from "./firebase";

function App(props) {
  const [selectedMonth, setSelectedMonth] = useState({
    date: new Date(),
    monthYear: new Date().toLocaleDateString().slice(-7)
  });

  const [expenses, setExpenses] = useState([]);
  const [monthlyBudgets, setMonthlyBudgets] = useState([]);

  useEffect(() => {
    budgetsRef.on("value", snapshot => {
      const json = snapshot.toJSON();
      const ids = Object.keys(json);
      const budgets = Object.values(json);

      const parseBudgets = budgets.map((budget, index) => ({
        ...budget,
        id: ids[index]
      }));
      setMonthlyBudgets(parseBudgets);
    });

    expensesRef.on("value", snapshot => {
      const json = snapshot.toJSON();
      const ids = Object.keys(json);
      const expenses = Object.values(json);

      const parseExpenses = expenses.map((expens, index) => ({
        ...expens,
        id: ids[index]
      }));
      setExpenses(parseExpenses);
    });

    return () => {
      budgetsRef.off();
      expensesRef.off();
    };
  }, []);

  function addMonthlyBudget(monthlyBudget) {
    budgetsRef.push(monthlyBudget);
  }

  function removeMonthlyBudget(monthlyBudgetID) {
    budgetsRef.child(monthlyBudgetID).remove();
  }

  function addExpense(expense) {
    expensesRef.push(expense);
  }

  function removeExpense(expenseID) {
    expensesRef.child(expenseID).remove();
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
            monthlyBudgets={monthlyBudgets}
            onAddMonthlyBudget={addMonthlyBudget}
            onRemoveMonthlyBudget={removeMonthlyBudget}
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
