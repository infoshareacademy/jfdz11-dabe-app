import React, { useState } from "react";
import MaterialTable from "material-table";

export default function ReviewList({
  selectedMonth,
  expenses,
  onRemoveExpense
}) {
  const [state, setState] = useState({
    columns: [
      { title: "Date", field: "date" },
      { title: "Category", field: "category" },
      { title: "Title", field: "title" },
      { title: "Cost", field: "cost" }
    ],
    data: expenses
      .filter(expens => expens.monthYear === selectedMonth.monthYear)
      .map(expens => ({
        date: expens.date.slice(0, 10),
        cost: expens.cost,
        title: expens.title,
        category: expens.category
      }))
  });

  return (
    <MaterialTable
      title="All financial operations"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
}
