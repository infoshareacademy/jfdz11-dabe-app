import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  textField: {
    margin: 0
  }
}));

export default function PasswordTextField(props) {
  const classes = useStyles();

  return (
    <TextField
      id="outlined-password-input"
      label="Password"
      className={classes.textField}
      type="password"
      autoComplete="current-password"
      margin="dense"
      variant="outlined"
      {...props}
    />
  );
}
