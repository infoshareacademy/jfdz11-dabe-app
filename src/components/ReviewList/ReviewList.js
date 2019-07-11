import React from "react";
import MaterialTable from "material-table";
import Functions from "@material-ui/icons/Functions";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import Home from "@material-ui/icons/Home";
import Fastfood from "@material-ui/icons/Fastfood";
import LocalMovies from "@material-ui/icons/LocalMovies";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import DirectionsBike from "@material-ui/icons/DirectionsBike";
import LaptopMac from "@material-ui/icons/LaptopMac";
import { makeStyles } from "@material-ui/core/styles";
import {
  food,
  entertainment,
  car,
  house,
  clothing,
  electronics,
  healthAndBeauty
} from "./ReviewList.module.css";

const useStylesPrimary = makeStyles({
  root: {
    padding: 10,
    margin: 0,
    fontSize: 45,
    border: "1px solid rgba(19, 145, 135, 0.85)",
    borderRadius: "50%",
    color: "white",
    backgroundColor: "rgba(19, 145, 135, 0.85)"
  }
});

const useStyles = makeStyles({
  root: {
    padding: 12,
    margin: 0,
    fontSize: 45,
    border: "1px solid rgba(19, 145, 135, 0.85)",
    borderRadius: "50%",
    color: "indianred",
    backgroundColor: "rgba(19, 145, 135, 0.85)"
  }
});

function setLabelClass(categories, rowData) {
  return categories.reduce((r, c) => {
    if (c.cat === rowData.category) {
      r = c.class;
      return r;
    }
    return r;
  }, "");
}

function setLabelShortcut(categories, rowData) {
  return categories.reduce((r, c) => {
    if (c.cat === rowData.category) {
      r = c.shortcut;
      return r;
    }
    return r;
  }, "");
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

export default function ReviewList({ expenses, onRemoveExpense }) {
  const classesPrimary = useStylesPrimary();
  const classes = useStyles();
  const columns = [
    {
      title: "",
      field: "",
      render: rowData => (
        <div className={setLabelClass(categories, rowData)}>
          {setLabelShortcut(categories, rowData)}
        </div>
      )
    },
    {
      title: "Category",
      field: "category",
      lookup: {
        Food: "Food",
        Entertainment: "Entertainment",
        Car: "Car",
        House: "House",
        Clothing: "Clothing",
        Electronics: "Electronics",
        HealthAndBeauty: "HealthAndBeauty"
      }
    },
    {
      title: "Title",
      field: "title"
    },
    {
      title: "Cost(PLN)",
      field: "cost"
    },
    {
      title: "Date",
      field: "date",
      customSort: (a, b) =>
        new Date(a.monthYear.replace(".", `.${a.date.slice(0, 3)}`)) >
        new Date(b.monthYear.replace(".", `.${b.date.slice(0, 3)}`))
          ? -1
          : new Date(a.monthYear.replace(".", `.${a.date.slice(0, 3)}`)) <
            new Date(b.monthYear.replace(".", `.${b.date.slice(0, 3)}`))
          ? 1
          : 0
    }
  ];

  const icons = [
    <Functions
      classes={{
        root: classesPrimary.root
      }}
    />,
    <DirectionsCar
      classes={{
        root: classes.root
      }}
    />,
    <Home
      classes={{
        root: classes.root
      }}
    />,
    <Fastfood
      classes={{
        root: classes.root
      }}
    />,
    <LocalMovies
      classes={{
        root: classes.root
      }}
    />,
    <ShoppingCart
      classes={{
        root: classes.root
      }}
    />,
    <DirectionsBike
      classes={{
        root: classes.root
      }}
    />,
    <LaptopMac
      classes={{
        root: classes.root
      }}
    />
  ];

  return (
    <MaterialTable
      columns={columns}
      data={expenses}
      options={{
        filtering: true
      }}
      components={{
        Toolbar: props => (
          <div>
            <div
              style={{
                height: 175,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "20%",
                  paddingLeft: 30
                }}
              >
                <div>{icons[0]}</div>
                <div style={{ fontSize: 24, paddingLeft: 15, fontWeight: 500 }}>
                  {String.fromCharCode(931)} :
                </div>
                <div style={{ fontSize: 24, paddingLeft: 10 }}>
                  {expenses.reduce((sum, expense) => (sum += expense.cost), 0)}{" "}
                  PLN
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "20%",
                  paddingLeft: 30
                }}
              >
                <div>{icons[1]}</div>
                <div style={{ fontSize: 24, paddingLeft: 15, fontWeight: 500 }}>
                  {String.fromCharCode(931)} :
                </div>
                <div style={{ fontSize: 24, paddingLeft: 10 }}>
                  {expenses.reduce(
                    (sum, expense) =>
                      expense.category === "Car" ? (sum += expense.cost) : sum,
                    0
                  )}{" "}
                  PLN
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "20%",
                  paddingLeft: 30
                }}
              >
                <div>{icons[2]}</div>
                <div style={{ fontSize: 24, paddingLeft: 15, fontWeight: 500 }}>
                  {String.fromCharCode(931)} :
                </div>
                <div style={{ fontSize: 24, paddingLeft: 10 }}>
                  {expenses.reduce(
                    (sum, expense) =>
                      expense.category === "House"
                        ? (sum += expense.cost)
                        : sum,
                    0
                  )}{" "}
                  PLN
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "20%",
                  paddingLeft: 30
                }}
              >
                <div>{icons[3]}</div>
                <div style={{ fontSize: 24, paddingLeft: 15, fontWeight: 500 }}>
                  {String.fromCharCode(931)} :
                </div>
                <div style={{ fontSize: 24, paddingLeft: 10 }}>
                  {expenses.reduce(
                    (sum, expense) =>
                      expense.category === "Food" ? (sum += expense.cost) : sum,
                    0
                  )}{" "}
                  PLN
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "20%",
                  paddingLeft: 30
                }}
              >
                <div>{icons[4]}</div>
                <div style={{ fontSize: 24, paddingLeft: 15, fontWeight: 500 }}>
                  {String.fromCharCode(931)} :
                </div>
                <div style={{ fontSize: 24, paddingLeft: 10 }}>
                  {expenses.reduce(
                    (sum, expense) =>
                      expense.category === "Entertainment"
                        ? (sum += expense.cost)
                        : sum,
                    0
                  )}{" "}
                  PLN
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "20%",
                  paddingLeft: 30
                }}
              >
                <div>{icons[5]}</div>
                <div style={{ fontSize: 24, paddingLeft: 15, fontWeight: 500 }}>
                  {String.fromCharCode(931)} :
                </div>
                <div style={{ fontSize: 24, paddingLeft: 10 }}>
                  {expenses.reduce(
                    (sum, expense) =>
                      expense.category === "Clothing"
                        ? (sum += expense.cost)
                        : sum,
                    0
                  )}{" "}
                  PLN
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "20%",
                  paddingLeft: 30
                }}
              >
                <div>{icons[6]}</div>
                <div style={{ fontSize: 24, paddingLeft: 15, fontWeight: 500 }}>
                  {String.fromCharCode(931)} :
                </div>
                <div style={{ fontSize: 24, paddingLeft: 10 }}>
                  {expenses.reduce(
                    (sum, expense) =>
                      expense.category === "HealthAndBeauty"
                        ? (sum += expense.cost)
                        : sum,
                    0
                  )}{" "}
                  PLN
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "20%",
                  paddingLeft: 30
                }}
              >
                <div>{icons[7]}</div>
                <div style={{ fontSize: 24, paddingLeft: 15, fontWeight: 500 }}>
                  {String.fromCharCode(931)} :
                </div>
                <div style={{ fontSize: 24, paddingLeft: 10 }}>
                  {expenses.reduce(
                    (sum, expense) =>
                      expense.category === "Electronics"
                        ? (sum += expense.cost)
                        : sum,
                    0
                  )}{" "}
                  PLN
                </div>
              </div>
            </div>
          </div>
        )
      }}
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
