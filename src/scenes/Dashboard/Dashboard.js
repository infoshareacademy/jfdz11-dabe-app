import React from "react";
import { dashboard, h2, charts } from "./Dashboard.module.css";
import {
  NewOperationForm,
  BudgetInput,
  ListOfExpenses,
  ChartPie,
  ChartBar
} from "../../components";

export default function Dashboard({
  budgetPerMonth,
  setBudgetPerMonth,
  budgetDetermined,
  setBudgetDetermined,
  expenses,
  setExpenses,
  addExpense,
  requirements,
  setRequirements
}) {
  return (
    <div className={dashboard}>
      <div>
        <BudgetInput
          budgetPerMonth={budgetPerMonth}
          setBudgetPerMonth={setBudgetPerMonth}
          budgetDetermined={budgetDetermined}
          setBudgetDetermined={setBudgetDetermined}
          expenses={expenses}
          setExpenses={setExpenses}
        />
        <NewOperationForm
          addExpense={addExpense}
          requirements={requirements}
          setRequirements={setRequirements}
        />
      </div>
      <div>
        <h2 className={h2}>List of financial operations</h2>
        <ListOfExpenses />
      </div>
      <div className={charts}>
        <div>
          <ChartPie />
        </div>
        <div>
          <ChartBar />
        </div>
      </div>
    </div>
  );
}
