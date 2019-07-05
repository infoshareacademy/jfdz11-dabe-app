import React from "react";
import { listOfExpenses } from "./ListOfExpenses.module.css";
import { ExpensesListItem } from "../../components";

export default function ListOfExpenses({ expenses, onRemoveExpense }) {
  return (
    <ul className={listOfExpenses}>
      {expenses.map(expens => (
        <ExpensesListItem
          key={expens.id}
          onRemoveExpense={onRemoveExpense}
          {...expens}
        />
      ))}
    </ul>
  );
}
