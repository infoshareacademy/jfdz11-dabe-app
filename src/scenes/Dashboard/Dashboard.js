import React from "react";
import { dashboard, charts, piechart, barchart } from "./Dashboard.module.css";
import {
  NewOperationForm,
  BudgetInput,
  ListOfExpenses,
  ChartPie,
  ChartBar
} from "../../components";

export default function Dashboard(props) {
  return (
    <div className={dashboard}>
      <div>
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
    </div>
  );
}
