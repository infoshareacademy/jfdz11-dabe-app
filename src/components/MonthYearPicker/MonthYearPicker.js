import React, { useContext } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { ExpensesContext } from "../../contexts/ExpensesContext";

const materialTheme = createMuiTheme({
  palette: {
    primary: teal
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "rgba(19, 145, 135, 0.85)"
      }
    },
    MuiPickersDay: {
      day: {
        color: "rgba(19, 145, 135, 0.85)"
      },
      daySelected: {
        backgroundColor: "rgba(19, 145, 135, 0.85)"
      },
      current: {
        color: "rgba(19, 145, 135, 0.85)"
      }
    }
  }
});

const useStyles = makeStyles({
  root: {
    width: 180,
    "& input": {
      color: "white",
      backgroundColor: "rgba(19, 145, 135, 0.65)",
      textAlign: "center",
      textDecoration: "none",
      padding: 0,
      fontSize: 34,
      borderStyle: "none",
      cursor: "pointer"
    }
  },
  disabled: {
    width: 180,
    "& input": {
      color: "black",
      backgroundColor: "rgb(208, 202, 230)",
      textAlign: "center",
      textDecoration: "none",
      padding: 0,
      fontSize: 34,
      borderStyle: "none",
      cursor: "pointer"
    }
  }
});

export default function MonthYearPicker(props) {
  const classes = useStyles();
  const expensesContext = useContext(ExpensesContext);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={materialTheme}>
        {expensesContext.disableMonthYearPicker ? (
          <DatePicker
            disabled={expensesContext.disableMonthYearPicker}
            classes={{
              root: classes.disabled, // class name, e.g. `classes-nesting-root-x`
              label: classes.label // class name, e.g. `classes-nesting-label-x`
            }}
            inputVariant="outlined"
            openTo="month"
            views={["year", "month"]}
            format="MM/yyyy"
            value={expensesContext.selectedMonth.date}
          />
        ) : (
          <DatePicker
            disabled={expensesContext.disableMonthYearPicker}
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              label: classes.label // class name, e.g. `classes-nesting-label-x`
            }}
            inputVariant="outlined"
            openTo="month"
            views={["year", "month"]}
            format="MM/yyyy"
            value={expensesContext.selectedMonth.date}
            onChange={date => {
              expensesContext.setSelectedMonth({
                date,
                monthYear: date.toLocaleDateString().slice(-7)
              });
            }}
          />
        )}
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}
