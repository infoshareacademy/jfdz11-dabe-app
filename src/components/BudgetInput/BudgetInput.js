import React from "react";
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
  budgetPerMonth,
  setBudgetPerMonth,
  budgetDetermined,
  setBudgetDetermined
}) {
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
          <h2>The budget in {monthArr[new Date().getMonth()]} is</h2>
          <div className={header}>
            <h1 className={h1}>
              <u>{budgetPerMonth} PLN</u>
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
                value={budgetPerMonth}
                noStyle
                className={input}
                onChange={value => setBudgetPerMonth(value)}
              />
              <span>PLN</span>
            </div>
            <div>
              <ButtonSubmit
                onClick={() => setBudgetDetermined(!budgetDetermined)}
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
