import React from "react";
import {
  budgetInput,
  numericInput,
  inputWrapper,
  input
} from "./BudgetInput.module.css";
import * as Numeric from "react-numeric-input";
import { ButtonSubmit } from "../../components";

export default function BudgetInput(props) {
  return (
    <div className={budgetInput}>
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
            value={0}
            noStyle
            className={input}
          />
          <span>PLN</span>
        </div>
        <div>
          <ButtonSubmit style={{ backgroundColor: "rgba(19, 145, 135, 0.85)" }}>
            Save
          </ButtonSubmit>
        </div>
      </div>
    </div>
  );
}
