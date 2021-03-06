import React from "react";
import TextField from "@material-ui/core/TextField";

export default function OperationTitle(props) {
  return (
    <TextField
      inputProps={{ maxLength: 25 }}
      label="Title"
      type="text"
      variant="outlined"
      {...props}
    />
  );
}
