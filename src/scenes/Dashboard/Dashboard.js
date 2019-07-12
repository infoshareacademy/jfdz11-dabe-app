import React from "react";
import { dashboard, charts, piechart, barchart } from "./Dashboard.module.css";
import {
  NewOperationForm,
  BudgetInput,
  ListOfExpenses,
  ChartPie,
  ChartBar
} from "../../components";

export default function Dashboard({
  selectedMonth,
  monthlyBudgets,
  expenses,
  onAddExpense,
  onRemoveExpense,
  setExpenses
}) {
  return (
    <div className={dashboard}>
      <div>
        <BudgetInput
          selectedMonth={selectedMonth}
          expenses={expenses}
          setExpenses={setExpenses}
        />
        <NewOperationForm expenses={expenses} onAddExpense={onAddExpense} />
      </div>
      <div>
        <ListOfExpenses
          setExpenses={setExpenses}
          selectedMonth={selectedMonth}
          expenses={expenses}
          onRemoveExpense={onRemoveExpense}
        />
      </div>
      <div className={charts}>
        <div className={barchart}>
          <ChartBar selectedMonth={selectedMonth} expenses={expenses} />
        </div>
        <div className={piechart}>
          <ChartPie selectedMonth={selectedMonth} expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
