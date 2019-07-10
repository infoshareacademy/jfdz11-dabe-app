import React from "react";
import { ReviewList } from "../../components";

export default function Review({ selectedMonth, expenses, onRemoveExpense }) {
  return (
    <ReviewList
      selectedMonth={selectedMonth}
      expenses={expenses}
      onRemoveExpense={onRemoveExpense}
    />
  );
}
