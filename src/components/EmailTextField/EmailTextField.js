import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  textField: {
    margin: 0
  }
}));

export default function EmailTextField(props) {
  const classes = useStyles();

  return (
    <TextField
      id="outlined-email-input"
      label="Email"
      className={classes.textField}
      type="email"
      name="email"
      autoComplete="email"
      margin="dense"
      variant="outlined"
      {...props}
    />
  );
}
