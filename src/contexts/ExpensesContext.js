import React, { useState, useEffect } from "react";
import { budgetsRef, expensesRef } from "../firebase";

export const ExpensesContext = React.createContext();

export function ExpensesProvider(props) {
  const [selectedMonth, setSelectedMonth] = useState({
    date: new Date(),
    monthYear: new Date().toLocaleDateString().slice(-7)
  });

  const [expenses, setExpenses] = useState([]);
  const [monthlyBudgets, setMonthlyBudgets] = useState([]);

  const [monthlyBudget, setMonthlyBudget] = useState({
    budgetPerMonth: 0
  });

  const [requirements, setRequirements] = useState(false);

  const [expense, setExpense] = useState({
    cost: 0,
    date: new Date(),
    monthYear: new Date().toLocaleDateString().slice(-7),
    category: "",
    title: "",
    desc: false
  });

  function getBudgets() {
    budgetsRef.once("value").then(snapshot => {
      const json = snapshot.toJSON();
      const ids = Object.keys(json);
      const budgets = Object.values(json);

      const parseBudgets = budgets.map((budget, index) => ({
        ...budget,
        id: ids[index]
      }));
      setMonthlyBudgets(parseBudgets);
    });
  }

  function getExpenses() {
    expensesRef.once("value").then(snapshot => {
      const json = snapshot.toJSON();
      const ids = Object.keys(json);
      const expenses = Object.values(json);

      const parseExpenses = expenses.map((expens, index) => ({
        ...expens,
        id: ids[index]
      }));
      setExpenses(parseExpenses);
    });
  }

  useEffect(() => {
    getBudgets();
    getExpenses();
  }, []);

  function addMonthlyBudget(monthlyBudget) {
    budgetsRef.push(monthlyBudget).then(() => getBudgets());
  }

  function removeMonthlyBudget(monthlyBudgetID) {
    budgetsRef
      .child(monthlyBudgetID)
      .remove()
      .then(() => getBudgets());
  }

  function addExpense(expense) {
    expensesRef.push(expense).then(() => getExpenses());
  }

  function removeExpense(expenseID) {
    expensesRef
      .child(expenseID)
      .remove()
      .then(() => getExpenses());
  }

  function addExpenseByClick(expense) {
    if (
      expense.cost !== 0 &&
      expense.category &&
      expense.category !== "Unassigned" &&
      expense.title
    ) {
      setRequirements(false);
      addExpense(expense);
      setExpense({
        cost: 0,
        date: new Date(),
        monthYear: new Date().toLocaleDateString().slice(-7),
        category: "",
        title: "",
        desc: false
      });
    } else {
      setRequirements(true);
      return;
    }
  }

  return (
    <ExpensesContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        expenses,
        setExpenses,
        monthlyBudgets,
        setMonthlyBudgets,
        addMonthlyBudget,
        removeMonthlyBudget,
        addExpense,
        removeExpense,
        monthlyBudget,
        setMonthlyBudget,
        requirements,
        setRequirements,
        expense,
        setExpense,
        addExpenseByClick
      }}
      {...props}
    />
  );
}
