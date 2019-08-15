import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    height: "40px",
    backgroundColor: "rgba(19, 145, 135, 0.65)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(19, 145, 135, 0.85)"
    }
  }
}));

export default function ButtonSubmit(props) {
  const classes = useStyles();
  return <Button variant="outlined" className={classes.button} {...props} />;
}
