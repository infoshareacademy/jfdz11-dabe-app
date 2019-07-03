import React from "react";
import { dashboard } from "./Dashboard.module.css";
import {
  NewOperationForm,
  BudgetInput,
  ListOfExpenses
} from "../../components";

export default function Dashboard(props) {
  return (
    <div className={dashboard}>
      <div>
        <BudgetInput />
        <NewOperationForm />
      </div>
      <div>
        <h2 style={{ margin: 30 }}>List of financial operations</h2>
        <ListOfExpenses />
      </div>
    </div>
  );
}
