import React, { useState, useEffect } from "react";
import {
  li,
  remove,
  tit,
  price,
  unassigned,
  food,
  entertainment,
  car,
  house,
  clothing,
  electronics,
  healthAndBeauty
} from "./ExpensesListItem.module.css";

export default function ExpensesListItem({
  onRemoveExpense,
  id,
  category,
  cost,
  title
}) {
  const [labelClass, setLabelClass] = useState("");
  const [labelShortcut, setLabelShortcut] = useState("");

  useEffect(() => {
    setLabelClass(
      categories.reduce((r, c) => {
        if (c.cat === category) {
          r = c.class;
          return r;
        }
        return r;
      }, "")
    );
    setLabelShortcut(
      categories.reduce((r, c) => {
        if (c.cat === category) {
          r = c.shortcut;
          return r;
        }
        return r;
      }, "")
    );
  }, [category]);

  return (
    <li className={li}>
      <div className={labelClass}>{labelShortcut}</div>
      <div className={tit}>{title}</div>
      <div className={price}>{cost} pln</div>
      <button
        className={remove}
        onClick={() => {
          onRemoveExpense(id);
        }}
      />
    </li>
  );
}

const categories = [
  { class: unassigned, shortcut: "U", cat: "Unassigned" },
  { class: food, shortcut: "F", cat: "Food" },
  { class: entertainment, shortcut: "S", cat: "Entertainment" },
  { class: car, shortcut: "M", cat: "Car" },
  { class: house, shortcut: "H", cat: "House" },
  { class: clothing, shortcut: "C", cat: "Clothing" },
  { class: electronics, shortcut: "E", cat: "Electronics" },
  { class: healthAndBeauty, shortcut: "B", cat: "HealthAndBeauty" }
];
