import React from "react";
import { listOfExpenses } from "./ListOfExpenses.module.css";
import { ExpensesListItem } from "../../components";

export default function ListOfExpenses({
  selectedMonth,
  expenses,
  onRemoveExpense
}) {
  return (
    <ul className={listOfExpenses}>
      {expenses
        .filter(expens => expens.monthYear === selectedMonth.monthYear)
        .map(expens => (
          <ExpensesListItem
            key={expens.id}
            onRemoveExpense={onRemoveExpense}
            {...expens}
          />
        ))}
    </ul>
  );
}
