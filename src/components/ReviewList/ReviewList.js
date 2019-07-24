import React, { useContext } from "react";
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
import moment from "moment";
import numeral from "numeral";
import { ExpensesContext } from "../../contexts/ExpensesContext";

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

function setLabelClass(rowData) {
  return categories.reduce((r, c) => {
    if (c.cat === rowData.category) {
      r = c.class;
      return r;
    }
    return r;
  }, "");
}

function setLabelShortcut(rowData) {
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

export default function ReviewList(props) {
  const classesPrimary = useStylesPrimary();
  const classes = useStyles();
  const expensesContext = useContext(ExpensesContext);

  const columns = [
    {
      title: "",
      field: "",
      cellStyle: {
        textAlign: "center",
        width: "10%"
      },
      render: rowData => (
        <div className={setLabelClass(rowData)}>
          {setLabelShortcut(rowData)}
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
      },
      cellStyle: {
        textAlign: "center",
        width: "15%"
      }
    },
    {
      title: "Title",
      field: "title",
      cellStyle: {
        textAlign: "start"
      }
    },
    {
      title: "Cost(PLN)",
      field: "cost",
      cellStyle: {
        textAlign: "end",
        width: "10%"
      },
      render: rowData => numeral(rowData.cost).format("0,0.00")
    },
    {
      title: "Date",
      field: "date",
      type: "date",
      cellStyle: {
        textAlign: "end",
        width: "15%",
        paddingRight: 30
      },
      render: rowData => moment(rowData.date).format("MMMM Do, YYYY"),
      customSort: (a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)
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
      data={expensesContext.expenses}
      options={{
        filtering: true,
        headerStyle: {
          fontSize: "16px",
          textAlign: "center",
          backgroundColor: "rgba(19, 145, 135, 0.35)"
        },
        rowStyle: {
          backgroundColor: "rgba(19, 145, 135, 0.05)"
        }
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
                  {numeral(
                    expensesContext.expenses.reduce(
                      (sum, expense) => (sum += expense.cost),
                      0
                    )
                  ).format("0,0.")}{" "}
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
                  {numeral(
                    expensesContext.expenses.reduce(
                      (sum, expense) =>
                        expense.category === "Car"
                          ? (sum += expense.cost)
                          : sum,
                      0
                    )
                  ).format("0,0.")}{" "}
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
                  {numeral(
                    expensesContext.expenses.reduce(
                      (sum, expense) =>
                        expense.category === "House"
                          ? (sum += expense.cost)
                          : sum,
                      0
                    )
                  ).format("0,0.")}{" "}
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
                  {numeral(
                    expensesContext.expenses.reduce(
                      (sum, expense) =>
                        expense.category === "Food"
                          ? (sum += expense.cost)
                          : sum,
                      0
                    )
                  ).format("0,0.")}{" "}
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
                  {numeral(
                    expensesContext.expenses.reduce(
                      (sum, expense) =>
                        expense.category === "Entertainment"
                          ? (sum += expense.cost)
                          : sum,
                      0
                    )
                  ).format("0,0.")}{" "}
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
                  {numeral(
                    expensesContext.expenses.reduce(
                      (sum, expense) =>
                        expense.category === "Clothing"
                          ? (sum += expense.cost)
                          : sum,
                      0
                    )
                  ).format("0,0.")}{" "}
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
                  {numeral(
                    expensesContext.expenses.reduce(
                      (sum, expense) =>
                        expense.category === "HealthAndBeauty"
                          ? (sum += expense.cost)
                          : sum,
                      0
                    )
                  ).format("0,0.")}{" "}
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
                  {String.fromCharCode(931)}:
                </div>
                <div style={{ fontSize: 24, paddingLeft: 10 }}>
                  {numeral(
                    expensesContext.expenses.reduce(
                      (sum, expense) =>
                        expense.category === "Electronics"
                          ? (sum += expense.cost)
                          : sum,
                      0
                    )
                  ).format("0,0.")}{" "}
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
              expensesContext.removeExpense(oldData.id);
              resolve();
            }, 0);
          })
      }}
    />
  );
}
