import React, { useContext } from "react";
import { finances, charts, piechart, barchart } from "./Finances.module.css";
import {
  NewOperationForm,
  BudgetInput,
  ListOfExpenses,
  ChartPie,
  ChartBar,
  MonthYearPicker
} from "../../components";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function Finances(props) {
  const expensesContext = useContext(ExpensesContext);

  return (
    <div className={finances}>
      <div>
        <MonthYearPicker />
        <BudgetInput />
        <NewOperationForm />
      </div>
      <div>
        <ListOfExpenses />
      </div>
      <div className={charts}>
        <div className={barchart}>
          <ChartBar />
        </div>
        <div className={piechart}>
          <ChartPie />
        </div>
      </div>
      {expensesContext.monthlyBudgets.filter(
        budget => budget.monthYear === expensesContext.selectedMonth.monthYear
      ).length ? (
        <FormControlLabel
          style={{
            zIndex: 100,
            position: "absolute",
            bottom: 10,
            right: 35
          }}
          control={
            <Switch
              checked={
                expensesContext.monthlyBudgets.filter(
                  budget =>
                    budget.monthYear === expensesContext.selectedMonth.monthYear
                )[0].budgetClose
              }
              onChange={() => {
                expensesContext.closeMonthlyBudget(
                  expensesContext.monthlyBudgets.filter(
                    budget =>
                      budget.monthYear ===
                      expensesContext.selectedMonth.monthYear
                  )[0].id,
                  expensesContext.monthlyBudgets.filter(
                    budget =>
                      budget.monthYear ===
                      expensesContext.selectedMonth.monthYear
                  )[0].budgetClose
                );
              }}
              value="antoine"
            />
          }
          label="Close budget"
        />
      ) : null}
    </div>
  );
}
