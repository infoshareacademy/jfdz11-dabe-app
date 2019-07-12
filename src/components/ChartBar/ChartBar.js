import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { customTooltip } from "./ChartBar.module.css";

function data(selectedMonth, expenses) {
  return [
    {
      name: "",
      budget: expenses.find(
        expense => expense.monthYear === selectedMonth.monthYear
      ).budgetPerMonth,
      expenses: expenses.reduce(
        (result, expens) =>
          expens.monthYear === selectedMonth.monthYear
            ? (result += expens.cost)
            : result,
        0
      )
    }
  ];
}

function CustomTooltip({ payload, active }) {
  if (active) {
    return (
      <div className={customTooltip}>
        <p>{`${payload[0].name} : ${payload[0].value}`} PLN</p>
        <p>{`${payload[1].name} : ${payload[1].value}`} PLN</p>
      </div>
    );
  }
  return null;
}

export default function CartBar({ selectedMonth, expenses }) {
  return (
    <>
      <BarChart
        layout="vertical"
        width={565}
        height={260}
        data={data(selectedMonth, expenses)}
        margin={{
          top: 30,
          right: 20,
          bottom: 40,
          left: 20
        }}
      >
        <CartesianGrid strokeDasharray="0.5 0.5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          layout="vertical"
          dataKey="budget"
          barSize={40}
          fill="rgb(125, 110, 134)"
        />
        <Bar
          layout="vertical"
          dataKey="expenses"
          barSize={40}
          fill="indianred"
        />
      </BarChart>
    </>
  );
}
