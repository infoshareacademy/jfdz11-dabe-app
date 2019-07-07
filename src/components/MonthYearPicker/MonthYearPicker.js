import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
    }
  }
});

export default function MonthYearPicker({ selectedMonth, setSelectedMonth }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={materialTheme}>
        <DatePicker
          style={{ width: 85 }}
          inputVariant="outlined"
          openTo="month"
          views={["year", "month"]}
          format="MM.yyyy"
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
