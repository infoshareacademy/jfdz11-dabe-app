import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { blueGrey } from "@material-ui/core/colors";

const materialTheme = createMuiTheme({
  palette: {
    primary: blueGrey
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
    },
    MuiPickersModal: {
      dialogAction: {
        color: "rgba(19, 145, 135, 0.85)"
      }
    }
  }
});

export default function DatePicker({ selectedDate, expense, setExpense }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={materialTheme}>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          label="Date"
          format="dd/MM/yyyy"
          value={expense.date}
          InputAdornmentProps={{ position: "end" }}
          onChange={date =>
            setExpense({
              ...expense,
              date,
              monthYear: date.toLocaleDateString().slice(-7)
            })
          }
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}
