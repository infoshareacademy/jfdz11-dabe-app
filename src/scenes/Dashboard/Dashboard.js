import React from "react";
import { dashboard } from "./Dashboard.module.css";
import { NewOperationForm, BudgetInput } from "../../components";

export default function Dashboard(props) {
  return (
    <div className={dashboard}>
      <div>
        <BudgetInput />
        <NewOperationForm />
      </div>
    </div>
  );
}
