import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { customTooltip, header } from "./ChartPie.module.css";

function data(selectedMonth, expenses) {
  const categories = [
    "Food",
    "Entertainment",
    "Car",
    "House",
    "Clothing",
    "Electronics",
    "HealthAndBeauty"
  ];

  return Array(categories.length)
    .fill({ name: "", value: 0 })
    .map((e, index) => ({
      name: categories[index],
      value: expenses.reduce(
        (sum, expense) =>
          expense.category === categories[index] &&
          expense.monthYear === selectedMonth.monthYear
            ? (sum += expense.cost)
            : sum,
        0
      )
    }))
    .filter(item => item.value > 0);
}

const COLORS = [
  "darkslategrey",
  "olivedrab",
  "royalblue",
  "indianred",
  "rgba(19, 145, 135, 0.85)",
  "saddlebrown",
  "mediumpurple"
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function CustomTooltip({ payload, active }) {
  if (active) {
    return (
      <div className={customTooltip}>
        <p>{`${payload[0].name} : ${payload[0].value} PLN`}</p>
      </div>
    );
  }

  return null;
}

export default function ChartPie({ selectedMonth, expenses }) {
  return (
    <>
      <h3 className={header}>
        Percentage share of each category in a selected month.
      </h3>
      <PieChart width={565} height={310}>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          width={160}
          height={185}
        />
        <Pie
          data={data(selectedMonth, expenses)}
          dataKey="value"
          nameKey="name"
          cx={200}
          cy={150}
          outerRadius={150}
          fill="#8884d8"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data(selectedMonth, expenses).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
}
