import React, { useState } from "react";
import {
  li,
  dates,
  remove,
  tit,
  price,
  food,
  entertainment,
  car,
  house,
  clothing,
  electronics,
  healthAndBeauty,
  approval
} from "./ExpensesListItem.module.css";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import moment from "moment";
import numeral from "numeral";
import IconButton from "@material-ui/core/IconButton";

export default function ExpensesListItem({
  removeExpense,
  id,
  category,
  cost,
  title,
  date
}) {
  const [removeItem, setRemoveItem] = useState(false);

  const labelClass = () =>
    categories.reduce((r, c) => {
      if (c.cat === category) {
        r = c.class;
        return r;
      }
      return r;
    }, "");

  const labelShortcut = () =>
    categories.reduce((r, c) => {
      if (c.cat === category) {
        r = c.shortcut;
        return r;
      }
      return r;
    }, "");

  return (
    <li className={li}>
      {removeItem ? (
        <p className={approval}>
          Are you sure you want to delete this row?{"   "}
          <IconButton
            size="small"
            onClick={() => {
              removeExpense(id);
              setRemoveItem(!removeItem);
            }}
          >
            <Check />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setRemoveItem(!removeItem);
            }}
          >
            <Close />
          </IconButton>
        </p>
      ) : (
        <>
          <div className={dates}>{moment(date).format("MMM Do")}</div>
          <div className={labelClass()}>{labelShortcut()}</div>
          <div className={tit}>{title}</div>
          <div className={price}>{numeral(cost).format("0,0.00")}</div>
          <button
            className={remove}
            onClick={() => {
              setRemoveItem(true);
            }}
          />
        </>
      )}
    </li>
  );
}

const categories = [
  { class: food, shortcut: "F", cat: "Food" },
  { class: entertainment, shortcut: "S", cat: "Entertainment" },
  { class: car, shortcut: "M", cat: "Car" },
  { class: house, shortcut: "H", cat: "House" },
  { class: clothing, shortcut: "C", cat: "Clothing" },
  { class: electronics, shortcut: "E", cat: "Electronics" },
  { class: healthAndBeauty, shortcut: "B", cat: "HealthAndBeauty" }
];
