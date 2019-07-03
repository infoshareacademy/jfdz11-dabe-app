import React from "react";
import { newOperationForm } from "./NewOperationForm.module.css";
import {
  DatePicker,
  NumericInput,
  CategoriesSelect,
  OperationTitle
} from "../../components";

export default function NewOperationForm(props) {
  return (
    <div className={newOperationForm}>
      <NumericInput />
      <CategoriesSelect />
      <DatePicker />
      <OperationTitle />
    </div>
  );
}
