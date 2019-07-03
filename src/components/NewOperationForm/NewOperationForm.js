import React from "react";
import { newOperationForm } from "./NewOperationForm.module.css";
import {
  DatePicker,
  NumericInput,
  CategoriesSelect,
  OperationTitle,
  ButtonSubmit
} from "../../components";

export default function NewOperationForm(props) {
  return (
    <form className={newOperationForm}>
      <NumericInput />
      <CategoriesSelect />
      <DatePicker />
      <OperationTitle />
      <ButtonSubmit
        type="submit"
        style={{ backgroundColor: "rgba(19, 145, 135, 0.85)" }}
      >
        Add
      </ButtonSubmit>
    </form>
  );
}
