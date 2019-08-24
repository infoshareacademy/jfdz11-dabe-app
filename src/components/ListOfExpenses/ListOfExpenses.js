import React, { useContext, useState } from "react";
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
import { ExpensesContext } from "../../contexts/ExpensesContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    margin: 0,
    padding: 0,
    "& input": {
      margin: 0,
      padding: "5px 10px",
      height: 30
    },
    "& label": {
      transform: "translate(14px, 14px) scale(1);"
    }
  }
}));

export default function ListOfExpenses(props) {
  const expensesContext = useContext(ExpensesContext);
  const classes = useStyles();
  const [filteredTitle, setFilteredTitle] = useState("");
  const icon = [<SwapVert />];

  function sortByPrice() {
    let newExpensesList = expensesContext.expenses;
    if (expensesContext.expenses[0].desc) {
      newExpensesList = expensesContext.expenses
        .sort((a, b) => a.cost - b.cost)
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    } else {
      newExpensesList = expensesContext.expenses
        .sort((a, b) => b.cost - a.cost)
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    }
    expensesContext.setExpenses(newExpensesList);
  }

  function sortByDate() {
    let newExpensesList = expensesContext.expenses;
    if (expensesContext.expenses[0].desc) {
      newExpensesList = expensesContext.expenses
        .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    } else {
      newExpensesList = expensesContext.expenses
        .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    }
    expensesContext.setExpenses(newExpensesList);
  }

  function sortByTitle() {
    let newExpensesList = expensesContext.expenses;
    if (expensesContext.expenses[0].desc) {
      newExpensesList = expensesContext.expenses
        .sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0))
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    } else {
      newExpensesList = expensesContext.expenses
        .sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0))
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    }
    expensesContext.setExpenses(newExpensesList);
  }

  function sortByCat() {
    let newExpensesList = expensesContext.expenses;
    if (expensesContext.expenses[0].desc) {
      newExpensesList = expensesContext.expenses
        .sort((a, b) =>
          a.category < b.category ? -1 : a.category > b.category ? 1 : 0
        )
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    } else {
      newExpensesList = expensesContext.expenses
        .sort((a, b) =>
          a.category > b.category ? -1 : a.category < b.category ? 1 : 0
        )
        .map(expens => ({
          ...expens,
          desc: !expens.desc
        }));
    }
    expensesContext.setExpenses(newExpensesList);
  }

  return (
    <div className={listOfExpenses}>
      <div>
        <div className={header}>
          <p className={p1} onClick={sortByDate}>
            {icon[0]}date
          </p>
          <p className={p2} onClick={sortByCat}>
            {icon[0]}cat.
          </p>
          <div className={p3}>
            <SwapVert onClick={sortByTitle} />{" "}
            <TextField
              id="outlined-search"
              label="Search by title"
              type="search"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={event => {
                setFilteredTitle(event.target.value);
              }}
            />
          </div>
          <p className={p4} onClick={sortByPrice}>
            {icon[0]}cost(PLN)
          </p>
        </div>
        <ul className={ul}>
          {expensesContext.expenses
            .filter(
              expens =>
                expens.monthYear === expensesContext.selectedMonth.monthYear &&
                expens.title.indexOf(filteredTitle) !== -1
            )
            .map(expens => (
              <ExpensesListItem
                key={expens.id}
                removeExpense={expensesContext.removeExpense}
                {...expens}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
