import React, { useState } from "react";
import {
  budgetInput_edit,
  budgetInput_save,
  numericInput,
  inputWrapper,
  input,
  header,
  h1
} from "./BudgetInput.module.css";
import * as Numeric from "react-numeric-input";
import { ButtonSubmit } from "../../components";

export default function BudgetInput({
  selectedMonth,
  monthlyBudgets,
  onAddMonthlyBudget,
  setMonthlyBudgets
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
        <div className={budgetInput_edit}>
          <h2>
            The budget in{" "}
            {
              monthArr[
                monthlyBudgets.filter(
                  budget => budget.monthYear === selectedMonth.monthYear
                )[0].month
              ]
            }{" "}
            is
          </h2>
          <div className={header}>
            <h1 className={h1}>
              <u>
                {
                  monthlyBudgets.filter(
                    budget => budget.monthYear === selectedMonth.monthYear
                  )[0].budgetPerMonth
                }{" "}
              </u>{" "}
              PLN
            </h1>
            <div>
              <ButtonSubmit
                onClick={() => {
                  const indexToRemove = monthlyBudgets.findIndex(
                    budget => budget.monthYear === selectedMonth.monthYear
                  );
                  monthlyBudgets.splice(indexToRemove, 1);
                  const newMonthlyBudgets = [...monthlyBudgets];
                  setMonthlyBudgets(newMonthlyBudgets);
                }}
                style={{ backgroundColor: "rgba(19, 145, 135, 0.85)" }}
              >
                Edit
              </ButtonSubmit>
            </div>
          </div>
        </div>
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
                    ...monthlyBudget,
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
