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
export default function BudgetInput({
  selectedMonth,
  monthlyBudgets,
  onAddMonthlyBudget,
  onRemoveMonthlyBudget,
  expenses
}) {
  const [monthlyBudget, setMonthlyBudget] = useState({
    budgetPerMonth: 0
  });
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
      {monthlyBudgets.filter(
        budget => budget.monthYear === selectedMonth.monthYear
      ).length ? (
        <>
          <div className={budgetInput_edit}>
            <p className={p1}>
              Budget in{" "}
              {
                monthArr[
                  monthlyBudgets.filter(
                    budget => budget.monthYear === selectedMonth.monthYear
                  )[0].month
                ]
              }
            </p>
            <p className={p2}>
              {new Intl.NumberFormat("de-DE").format(
                monthlyBudgets.filter(
                  budget => budget.monthYear === selectedMonth.monthYear
                )[0].budgetPerMonth
              )}{" "}
              PLN
            </p>
            <p className={p3}>
              Saldo{" "}
              {new Intl.NumberFormat("de-DE").format(
                monthlyBudgets.reduce(
                  (result, budget) =>
                    budget.monthYear === selectedMonth.monthYear
                      ? (result += budget.budgetPerMonth)
                      : result,
                  0
                ) -
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
                const budgetToRemoveID = monthlyBudgets.find(
                  budget => budget.monthYear === selectedMonth.monthYear
                ).id;
                onRemoveMonthlyBudget(budgetToRemoveID);
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
                value={monthlyBudget.budgetPerMonth}
                noStyle
                className={input}
                onChange={value =>
                  setMonthlyBudget({
                    budgetPerMonth: value,
                    monthYear: selectedMonth.monthYear,
                    month: selectedMonth.date.getMonth()
                  })
                }
              />
              <span>PLN</span>
            </div>
            <div>
              <ButtonSubmit
                onClick={() => {
                  if (monthlyBudget.budgetPerMonth) {
                    onAddMonthlyBudget(monthlyBudget);
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
