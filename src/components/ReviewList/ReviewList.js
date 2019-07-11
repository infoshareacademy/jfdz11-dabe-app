import React, { useState } from "react";
import MaterialTable from "material-table";

export default function ReviewList({ expenses, onRemoveExpense }) {
  const columns = [
    { title: "ID", field: "id" },
    { title: "Date", field: "date" },
    { title: "Category", field: "category" },
    { title: "Title", field: "title" },
    { title: "Cost", field: "cost" }
  ];

  return (
    <MaterialTable
      title="All financial operations"
      columns={columns}
      data={expenses}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              onRemoveExpense(oldData.id);
              resolve();
            }, 0);
          })
      }}
    />
  );
}
