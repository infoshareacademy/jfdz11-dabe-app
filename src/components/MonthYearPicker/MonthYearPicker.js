import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { teal } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

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
      textAlign: "center",
      textDecoration: "none",
      padding: 0,
      fontSize: 34,
      borderStyle: "none",
      cursor: "pointer"
    }
  }
});

export default function MonthYearPicker({ selectedMonth, setSelectedMonth }) {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={materialTheme}>
        <DatePicker
          classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
            label: classes.label // class name, e.g. `classes-nesting-label-x`
          }}
          inputVariant="standard"
          openTo="month"
          views={["year", "month"]}
          format="MM/yyyy"
          value={selectedMonth.date}
          onChange={date =>
            setSelectedMonth({
              date,
              monthYear: date.toLocaleDateString().slice(-7)
            })
          }
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}
