import React, { useContext, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { db } from "../../firebase";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import { Chart, Saldo, Expenses } from "../../components";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden;",
    flexDirection: "column"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  fixedHeight: {
    height: 260
  }
}));

export default function SharedBudgets() {
  const expensesContext = useContext(ExpensesContext);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [labelWidth, setLabelWidth] = useState(0);
  const inputLabel = useRef(null);

  const [selectedBudget, setSelectedBudget] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudgets, setMonthlyBudgets] = useState([]);

  function handleChange(event) {
    setSelectedBudget(event.target.value);
  }

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    db.ref(`budgets/${selectedBudget.id}`).on("value", snapshot => {
      if (snapshot.val()) {
        const monthlyBudgets = snapshot.val();
        const parseMonthlyBudgets = Object.keys(monthlyBudgets).map(key => ({
          ...monthlyBudgets[key],
          id: key
        }));
        setMonthlyBudgets(parseMonthlyBudgets);
      } else {
        setMonthlyBudgets([]);
      }
    });

    db.ref(`expenses/${selectedBudget.id}`).on("value", snapshot => {
      if (snapshot.val()) {
        const expenses = snapshot.val();
        const parseExpenses = Object.keys(expenses).map(key => ({
          ...expenses[key],
          id: key
        }));
        setExpenses(parseExpenses);
      } else {
        setExpenses([]);
      }
    });

    return () => {
      db.ref(`budgets/${selectedBudget.id}`).off();
      db.ref(`expenses/${selectedBudget.id}`).off();
    };
  }, [selectedBudget.id]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Shared budgets
        </InputLabel>
        <Select
          value={selectedBudget}
          onChange={handleChange}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              name="age"
              id="outlined-age-simple"
            />
          }
        >
          {expensesContext.budgetsSharedForMe.map(budget => (
            <MenuItem key={budget.id} value={budget}>
              {budget.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart expenses={expenses} monthlyBudgets={monthlyBudgets} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Saldo expenses={expenses} monthlyBudgets={monthlyBudgets} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <Expenses expenses={expenses} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
