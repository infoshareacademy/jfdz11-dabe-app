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
    getFromLocalStorage("expenses", initialExpenses)
  );
  const [monthlyBudgets, setMonthlyBudgets] = useState(
    getFromLocalStorage("monthlyBudgets", initialMonthlyBudgets)
  );
  const [requirements, setRequirements] = useState(
    getFromLocalStorage("requirements", false)
  );

  useEffect(() => {
    setLocalStorage("monthlyBudgets", monthlyBudgets);
    setLocalStorage("expenses", expenses);
    setLocalStorage("requirements", requirements);
  }, [monthlyBudgets, expenses, requirements]);

  function addMonthlyBudget(monthlyBudget) {
    const newMonthlyBudgets = [...monthlyBudgets, monthlyBudget];
    setMonthlyBudgets(newMonthlyBudgets);
  }

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
            monthlyBudgets={monthlyBudgets}
            onAddMonthlyBudget={addMonthlyBudget}
            setMonthlyBudgets={setMonthlyBudgets}
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

const initialMonthlyBudgets = [
  {
    budgetPerMonth: 1300,
    monthYear: "02.2019",
    month: 1
  },
  {
    budgetPerMonth: 1500,
    monthYear: "03.2019",
    month: 2
  },
  {
    budgetPerMonth: 1700,
    monthYear: "04.2019",
    month: 3
  },
  {
    budgetPerMonth: 1900,
    monthYear: "05.2019",
    month: 4
  },
  {
    budgetPerMonth: 2100,
    monthYear: "06.2019",
    month: 5
  }
];

const initialExpenses = [
  {
    id: uuid(),
    cost: 80,
    date: "2.06.2019",
    monthYear: "06.2019",
    category: "HealthAndBeauty",
    title: "Joga."
  },
  {
    id: uuid(),
    cost: 50,
    date: "3.06.2019",
    monthYear: "06.2019",
    category: "Food",
    title: "SurfBurger."
  },
  {
    id: uuid(),
    cost: 80,
    date: "1.05.2019",
    monthYear: "05.2019",
    category: "Entertainment",
    title: "CinemaCity: Avangers - End Game."
  },
  {
    id: uuid(),
    cost: 45,
    date: "2.05.2019",
    monthYear: "05.2019",
    category: "House",
    title: "Door handles replacement."
  },
  {
    id: uuid(),
    cost: 120,
    date: "4.04.2019",
    monthYear: "04.2019",
    category: "Clothing",
    title: "New hat."
  },
  {
    id: uuid(),
    cost: 150,
    date: "21.04.2019",
    monthYear: "04.2019",
    category: "Clothing",
    title: "Skirt."
  },
  {
    id: uuid(),
    cost: 220,
    date: "12.03.2019",
    monthYear: "03.2019",
    category: "Car",
    title: "New gear."
  },
  {
    id: uuid(),
    cost: 440,
    date: "24.03.2019",
    monthYear: "03.2019",
    category: "House",
    title: "New door."
  },
  {
    id: uuid(),
    cost: 342,
    date: "28.02.2019",
    monthYear: "02.2019",
    category: "House",
    title: "New carpet."
  },
  {
    id: uuid(),
    cost: 320,
    date: "24.02.2019",
    monthYear: "02.2019",
    category: "Clothing",
    title: "New jacket."
  }
];
