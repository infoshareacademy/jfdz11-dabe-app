import React from "react";
import { dashboard } from "./Dashboard.module.css";
import { NewOperationForm } from "../../components";

export default function Dashboard(props) {
  return (
    <div className={dashboard}>
      <NewOperationForm />
    </div>
  );
}
