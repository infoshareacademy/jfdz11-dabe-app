import React, { useState } from "react";
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

export default function BudgetInput({ selectedMonth, expenses, setExpenses }) {
  const [monthlyBudget, setMonthlyBudget] = useState(0);

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
      {expenses.find(expens => expens.monthYear === selectedMonth.monthYear)
        .budgetPerMonth ? (
        <>
          <div className={budgetInput_edit}>
            <p className={p1}>
              Budget in{" "}
              {
                monthArr[
                  Number(
                    expenses
                      .find(
                        expens => expens.monthYear === selectedMonth.monthYear
                      )
                      .monthYear.slice(0, 2)
                  ) - 1
                ]
              }
            </p>
            <p className={p2}>
              {new Intl.NumberFormat("de-DE").format(
                expenses.find(
                  expens => expens.monthYear === selectedMonth.monthYear
                ).budgetPerMonth
              )}{" "}
              PLN
            </p>
            <p className={p3}>
              Saldo{" "}
              {new Intl.NumberFormat("de-DE").format(
                expenses.find(
                  expense => expense.monthYear === selectedMonth.monthYear
                ).budgetPerMonth -
                  expenses.reduce(
                    (result, expens) =>
                      expens.monthYear === selectedMonth.monthYear
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
                backgroundColor: "rgba(19, 145, 135, 0.85)",
                padding: 0,
                height: 25,
                width: 40,
                alignSelf: "flex-end"
              }}
              onClick={() => {
                const newExpenses = expenses.map(expense => {
                  if (expense.monthYear === selectedMonth.monthYear) {
                    return { ...expense, budgetPerMonth: 0 };
                  }
                  return expense;
                });
                setExpenses(newExpenses);
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
                value={monthlyBudget}
                noStyle
                className={input}
                onChange={value => setMonthlyBudget(value)}
              />
              <span>PLN</span>
            </div>
            <div>
              <ButtonSubmit
                onClick={() => {
                  if (monthlyBudget) {
                    const newExpenses = expenses.map(expense => {
                      if (expense.monthYear === selectedMonth.monthYear) {
                        return { ...expense, budgetPerMonth: monthlyBudget };
                      }
                      return expense;
                    });
                    setExpenses(newExpenses);
                    setMonthlyBudget({
                      budgetPerMonth: 0
                    });
                  }
                  return;
                }}
                style={{ backgroundColor: "rgba(19, 145, 135, 0.85)" }}
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
