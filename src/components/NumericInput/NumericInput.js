import React from "react";
import { numericInput, input } from "./NumericInput.module.css";
import * as Numeric from "react-numeric-input";

export default function NumericInput(props) {
  return (
    <div className={numericInput}>
      <Numeric
        name="cost"
        autoComplete="on"
        autoCorrect="on"
        required
        size={6}
        precision={2}
        value={0.0}
        style={false}
        className={input}
      />
      <span>PLN</span>
    </div>
  );
}
