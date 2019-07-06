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
  monthlyBudgets,
  onAddMonthlyBudget,
  budgetDetermined,
  setBudgetDetermined
}) {
  const [monthlyBudget, setMonthlyBudget] = useState({
    budgetPerMonth: 0,
    monthYear: new Date().toLocaleDateString().slice(-7),
    month: new Date().getMonth()
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
      {budgetDetermined ? (
        <div className={budgetInput_edit}>
          <h2>
            The budget in <strong>TO DO Daniel !!!</strong> is
          </h2>
          <div className={header}>
            <h1 className={h1}>
              <u>
                <strong>TO DO Daniel !!!</strong> PLN
              </u>
            </h1>
            <div>
              <ButtonSubmit
                onClick={() => setBudgetDetermined(!budgetDetermined)}
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
                  setMonthlyBudget({ ...monthlyBudget, budgetPerMonth: value })
                }
              />
              <span>PLN</span>
            </div>
            <div>
              <ButtonSubmit
                onClick={() => {
                  if (monthlyBudget.budgetPerMonth) {
                    setBudgetDetermined(!budgetDetermined);
                    onAddMonthlyBudget(monthlyBudget);
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
