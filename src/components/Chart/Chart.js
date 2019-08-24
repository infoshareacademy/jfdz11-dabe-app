import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import moment from "moment";
import Title from "../Title";

function currentMonthData(expenses, budgets) {
  const budget = budgets.filter(
    budget => budget.monthYear === new Date().toLocaleDateString().slice(-7)
  )[0].budgetPerMonth;
  const daysInCurrentMonth = new Date(
    new Date().getYear(),
    new Date().getMonth(),
    0
  ).getDate();
  const accumulatedDailySum = Array(daysInCurrentMonth).fill({});
  const expensesInCurrentMonth = expenses.filter(
    expense => expense.monthYear === new Date().toLocaleDateString().slice(-7)
  );

  return accumulatedDailySum.map((empty, index) => ({
    name: index + 1,
    "expenses on current day": expensesInCurrentMonth.reduce(
      (sum, expense) =>
        expense.date.slice(-2) <= index + 1
          ? (sum += expense.cost)
          : (sum += 0),
      0
    ),
    budget
  }));
}

export default function Chart(props) {
  const data =
    props.expenses.length && props.monthlyBudgets.length
      ? currentMonthData(props.expenses, props.monthlyBudgets)
      : [];

  return (
    <React.Fragment>
      <Title>{moment().format("MMMM")}</Title>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="0.5 0.5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="expenses on current day"
            barSize={20}
            fill="rgba(19, 145, 135, 0.65)"
          />
          <Line type="monotone" dataKey="budget" stroke="red" />
        </ComposedChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
