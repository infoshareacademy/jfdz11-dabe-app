import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../Title";
import moment from "moment";
import numeral from "numeral";
import { ExpensesContext } from "../../contexts/ExpensesContext";

const useStyles = makeStyles({
  saldoContext: {
    flex: 1
  }
});

export default function Saldo() {
  const classes = useStyles();
  const expensesContext = useContext(ExpensesContext);
  return (
    <React.Fragment>
      <Title>Saldo</Title>
      {expensesContext.expenses.length &&
      expensesContext.monthlyBudgets.length ? (
        <Typography component="p" variant="h4">
          PLN{" "}
          {numeral(
            expensesContext.monthlyBudgets.filter(
              budget =>
                budget.monthYear === new Date().toLocaleDateString().slice(-7)
            )[0].budgetPerMonth -
              expensesContext.expenses.reduce(
                (result, expens) =>
                  expens.monthYear === new Date().toLocaleDateString().slice(-7)
                    ? (result += expens.cost)
                    : result,
                0
              )
          ).format("0,0.00")}
        </Typography>
      ) : (
        <Typography>{numeral(0).format("0,0.00")}</Typography>
      )}

      <Typography
        style={{ color: "rgba(19, 145, 135, 0.65)" }}
        className={classes.saldoContext}
      >
        {moment().format("MMMM Do, YYYY")}
      </Typography>
    </React.Fragment>
  );
}
