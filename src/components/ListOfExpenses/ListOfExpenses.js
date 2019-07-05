import React from "react";
import { listOfExpenses } from "./ListOfExpenses.module.css";

function ListOfExpenses({ expenses, onRemoveExpense }) {
  return (
    <ul className={listOfExpenses}>
      {expenses.map(expens => (
        <ExpensesListItem
          onRemoveExpense={onRemoveExpense}
          key={expens.id}
          {...expens}
        />
      ))}
    </ul>
  );
}
