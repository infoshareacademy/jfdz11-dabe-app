import React from "react";
import SwapVert from "@material-ui/icons/SwapVert";
import {
  listOfExpenses,
  header,
  ul,
  p1,
  p2,
  p3,
  p4
} from "./ListOfExpenses.module.css";
import { ExpensesListItem } from "../../components";

export default function ListOfExpenses({
  selectedMonth,
  expenses,
  onRemoveExpense,
  setExpenses
}) {
  const icon = [<SwapVert />];

  function sortByPrice(expenses) {
    let newExpensesList = expenses;
    if (expenses[0].desc) {
      newExpensesList = expenses
        .sort((a, b) => a.cost - b.cost)
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    } else {
      newExpensesList = expenses
        .sort((a, b) => b.cost - a.cost)
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    }
    setExpenses(newExpensesList);
  }

  function sortByDate(expenses) {
    let newExpensesList = expenses;
    if (expenses[0].desc) {
      newExpensesList = expenses
        .sort((a, b) =>
          new Date(a.monthYear.replace(".", `.${a.date.slice(0, 3)}`)) <
          new Date(b.monthYear.replace(".", `.${b.date.slice(0, 3)}`))
            ? -1
            : new Date(a.monthYear.replace(".", `.${a.date.slice(0, 3)}`)) >
              new Date(b.monthYear.replace(".", `.${b.date.slice(0, 3)}`))
            ? 1
            : 0
        )
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    } else {
      newExpensesList = expenses
        .sort((a, b) =>
          new Date(a.monthYear.replace(".", `.${a.date.slice(0, 3)}`)) >
          new Date(b.monthYear.replace(".", `.${b.date.slice(0, 3)}`))
            ? -1
            : new Date(a.monthYear.replace(".", `.${a.date.slice(0, 3)}`)) <
              new Date(b.monthYear.replace(".", `.${b.date.slice(0, 3)}`))
            ? 1
            : 0
        )
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    }
    setExpenses(newExpensesList);
  }

  function sortByTitle(expenses) {
    let newExpensesList = expenses;
    if (expenses[0].desc) {
      newExpensesList = expenses
        .sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0))
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    } else {
      newExpensesList = expenses
        .sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0))
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    }
    setExpenses(newExpensesList);
  }

  function sortByCat(expenses) {
    let newExpensesList = expenses;
    if (expenses[0].desc) {
      newExpensesList = expenses
        .sort((a, b) =>
          a.category < b.category ? -1 : a.category > b.category ? 1 : 0
        )
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    } else {
      newExpensesList = expenses
        .sort((a, b) =>
          a.category > b.category ? -1 : a.category < b.category ? 1 : 0
        )
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    }
    setExpenses(newExpensesList);
  }

  return (
    <div className={listOfExpenses}>
      <div>
        <div className={header}>
          <p className={p1} onClick={() => sortByDate(expenses)}>
            {icon[0]}date
          </p>
          <p className={p2} onClick={() => sortByCat(expenses)}>
            {icon[0]}cat.
          </p>
          <p className={p3} onClick={() => sortByTitle(expenses)}>
            {icon[0]}title
          </p>
          <p className={p4} onClick={() => sortByPrice(expenses)}>
            {icon[0]}cost
          </p>
        </div>
        <ul className={ul}>
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
      </div>
    </div>
  );
}
