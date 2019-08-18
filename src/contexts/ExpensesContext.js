import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ExpensesContext = React.createContext();

export function ExpensesProvider(props) {
  const authContext = useContext(AuthContext);

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
    date: selectedMonth.date,
    monthYear: new Date().toLocaleDateString().slice(-7),
    category: "",
    title: "",
    desc: false
  });

  const [disableMonthYearPicker, setDisableMonthYearPicker] = useState(false);

  useEffect(() => {
    db.ref(`budgets/${authContext.user.uid}`).on("value", snapshot => {
      if (snapshot.val()) {
        const monthlyBudgets = snapshot.val();
        const parseMonthlyBudgets = Object.keys(monthlyBudgets).map(key => ({
          ...monthlyBudgets[key],
          id: key
        }));
        setMonthlyBudgets(parseMonthlyBudgets);
      } else {
        setMonthlyBudgets([]);
      }
    });

    db.ref(`expenses/${authContext.user.uid}`).on("value", snapshot => {
      if (snapshot.val()) {
        const expenses = snapshot.val();
        const parseExpenses = Object.keys(expenses).map(key => ({
          ...expenses[key],
          id: key
        }));
        setExpenses(parseExpenses);
      } else {
        setExpenses([]);
      }
    });

    authContext.getAvatarUrl(authContext.user.uid);

    return () => {
      db.ref(`budgets/${authContext.user.uid}`).off();
      db.ref(`expenses/${authContext.user.uid}`).off();
    };
  }, [authContext]);

  function addMonthlyBudget(monthlyBudget) {
    db.ref(`budgets/${authContext.user.uid}`).push(monthlyBudget);
  }

  function removeMonthlyBudget(monthlyBudgetID) {
    db.ref(`budgets/${authContext.user.uid}`)
      .child(monthlyBudgetID)
      .remove();
  }

  function closeMonthlyBudget(monthlyBudgetID, budgetClose) {
    const key = `budgets/${
      authContext.user.uid
    }/${monthlyBudgetID}/budgetClose`;
    const value = !budgetClose;
    db.ref().update({ [key]: value });
  }

  function addExpense(expense) {
    db.ref(`expenses/${authContext.user.uid}`).push(expense);
  }

  function removeExpense(expenseID) {
    db.ref(`expenses/${authContext.user.uid}`)
      .child(expenseID)
      .remove();
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
        addExpenseByClick,
        disableMonthYearPicker,
        setDisableMonthYearPicker,
        closeMonthlyBudget
      }}
      {...props}
    />
  );
}
