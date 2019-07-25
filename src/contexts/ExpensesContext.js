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
      const expenses = snapshot.val();
      const parseExpenses = Object.keys(expenses).map(key => ({
        ...expenses[key],
        id: key
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
