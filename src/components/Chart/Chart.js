import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import moment from "moment";
import Title from "../Title";
import { ExpensesContext } from "../../contexts/ExpensesContext";

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
    expensesOnCurrentDay: expensesInCurrentMonth.reduce(
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
  const expensesContext = useContext(ExpensesContext);
  const data =
    expensesContext.expenses.length && expensesContext.monthlyBudgets.length
      ? currentMonthData(
          expensesContext.expenses,
          expensesContext.monthlyBudgets
        )
      : [];

  return (
    <React.Fragment>
      <Title>{moment().format("MMMM")}</Title>
      <ResponsiveContainer>
        <LineChart
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
          <Line
            type="monotone"
            dataKey="expensesOnCurrentDay"
            name="cumulative sum"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="budget" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
