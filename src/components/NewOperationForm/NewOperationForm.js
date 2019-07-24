import React, { useContext } from "react";
import { newOperationForm, required } from "./NewOperationForm.module.css";
import {
  DatePicker,
  NumericInput,
  CategoriesSelect,
  OperationTitle,
  ButtonSubmit
} from "../../components";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function NewOperationForm(props) {
  const expensesContext = useContext(ExpensesContext);

  return (
    <form className={newOperationForm}>
      <NumericInput
        onChange={value =>
          expensesContext.setExpense({
            ...expensesContext.expense,
            cost: value
          })
        }
        value={expensesContext.expense.cost}
      />
      <CategoriesSelect
        expense={expensesContext.expense}
        setExpense={expensesContext.setExpense}
      />
      <DatePicker
        expense={expensesContext.expense}
        setExpense={expensesContext.setExpense}
      />
      <OperationTitle
        value={expensesContext.expense.title}
        onChange={event =>
          expensesContext.setExpense({
            ...expensesContext.expense,
            title: event.target.value
          })
        }
      />
      <ButtonSubmit
        style={{ backgroundColor: "rgba(19, 145, 135, 0.85)" }}
        onClick={() =>
          expensesContext.addExpenseByClick({
            ...expensesContext.expense,
            date: expensesContext.expense.date.toISOString().slice(0, 10)
          })
        }
      >
        Add
      </ButtonSubmit>
      {expensesContext.requirements ? (
        <p className={required}>* All fields required</p>
      ) : null}
    </form>
  );
}
