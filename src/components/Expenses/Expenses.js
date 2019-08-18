import React, { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import moment from "moment";
import numeral from "numeral";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function Expenses() {
  const expensesContext = useContext(ExpensesContext);
  const rows = expensesContext.expenses.length
    ? expensesContext.expenses
        .filter(
          expense =>
            expense.monthYear === new Date().toLocaleDateString().slice(-7)
        )
        .sort((firstExpense, secondExpense) =>
          secondExpense.date.localeCompare(firstExpense.date)
        )
        .slice(0, 6)
    : [];

  return (
    <React.Fragment>
      <Title>Last six expenses</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{moment(row.date).format("MMMM Do, YYYY")}</TableCell>
              <TableCell align="right">
                {numeral(row.cost).format("0,0.00")} PLN
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
