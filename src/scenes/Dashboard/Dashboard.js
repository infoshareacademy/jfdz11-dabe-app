import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
  fixedHeight: {
    height: 260
  }
}));

export default function Dashboard() {
  const expensesContext = useContext(ExpensesContext);
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart
                expenses={expensesContext.expenses}
                monthlyBudgets={expensesContext.monthlyBudgets}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Saldo
                expenses={expensesContext.expenses}
                monthlyBudgets={expensesContext.monthlyBudgets}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <Expenses expenses={expensesContext.expenses} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
