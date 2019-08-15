import React, { useContext } from "react";
import moment from "moment";
import {
  budgetInput_edit,
  budgetInput_save,
  numericInput,
  inputWrapper,
  input,
  p1,
  p2,
  p3,
  p4
} from "./BudgetInput.module.css";
import * as Numeric from "react-numeric-input";
import { ButtonSubmit } from "../../components";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function BudgetInput(props) {
  const expensesContext = useContext(ExpensesContext);
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return (
    <>
      {expensesContext.monthlyBudgets.filter(
        budget => budget.monthYear === expensesContext.selectedMonth.monthYear
      ).length ? (
        <>
          <div className={budgetInput_edit}>
            <p className={p1}>
              Budget in{" "}
              {
                monthArr[
                  expensesContext.monthlyBudgets.filter(
                    budget =>
                      budget.monthYear ===
                      expensesContext.selectedMonth.monthYear
                  )[0].month
                ]
              }
            </p>
            <p className={p2}>
              {new Intl.NumberFormat("de-DE").format(
                expensesContext.monthlyBudgets.filter(
                  budget =>
                    budget.monthYear === expensesContext.selectedMonth.monthYear
                )[0].budgetPerMonth
              )}{" "}
              PLN
            </p>
            <p className={p3}>
              Saldo{" "}
              {new Intl.NumberFormat("de-DE").format(
                expensesContext.monthlyBudgets.reduce(
                  (result, budget) =>
                    budget.monthYear === expensesContext.selectedMonth.monthYear
                      ? (result += budget.budgetPerMonth)
                      : result,
                  0
                ) -
                  expensesContext.expenses.reduce(
                    (result, expens) =>
                      expens.monthYear ===
                      expensesContext.selectedMonth.monthYear
                        ? (result += expens.cost)
                        : result,
                    0
                  )
              )}{" "}
              PLN
            </p>
            <p className={p4}>on {moment().format("MMMM Do, YYYY")}</p>
            <ButtonSubmit
              style={{
                padding: 0,
                height: 25,
                width: 40,
                alignSelf: "flex-end"
              }}
              onClick={() => {
                const budgetToRemoveID = expensesContext.monthlyBudgets.find(
                  budget =>
                    budget.monthYear === expensesContext.selectedMonth.monthYear
                ).id;
                expensesContext.setMonthlyBudget({
                  budgetPerMonth: expensesContext.monthlyBudgets.find(
                    budget =>
                      budget.monthYear ===
                      expensesContext.selectedMonth.monthYear
                  ).budgetPerMonth,
                  monthYear: expensesContext.selectedMonth.monthYear,
                  month: expensesContext.selectedMonth.date.getMonth()
                });
                expensesContext.removeMonthlyBudget(budgetToRemoveID);
                expensesContext.setDisableMonthYearPicker(true);
              }}
            >
              Edit
            </ButtonSubmit>
          </div>
        </>
      ) : (
        <div className={budgetInput_save}>
          <h3>Please enter budget for current month:</h3>
          <div className={numericInput}>
            <div className={inputWrapper}>
              <Numeric
                name="cost"
                autoComplete="on"
                autoCorrect="on"
                required
                size={8}
                maxLength={6}
                precision={0}
                value={expensesContext.monthlyBudget.budgetPerMonth}
                noStyle
                className={input}
                onChange={value => {
                  expensesContext.setMonthlyBudget({
                    budgetPerMonth: value,
                    monthYear: expensesContext.selectedMonth.monthYear,
                    month: expensesContext.selectedMonth.date.getMonth()
                  });
                }}
              />
              <span>PLN</span>
            </div>
            <div>
              <ButtonSubmit
                onClick={() => {
                  if (expensesContext.monthlyBudget.budgetPerMonth) {
                    expensesContext.addMonthlyBudget(
                      expensesContext.monthlyBudget
                    );
                    expensesContext.setMonthlyBudget({
                      budgetPerMonth: 0
                    });
                    expensesContext.setDisableMonthYearPicker(false);
                  }
                  return;
                }}
              >
                Save
              </ButtonSubmit>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
