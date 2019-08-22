import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { AuthContext } from "../../contexts/AuthContext";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function ShareYourBudget(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const expensesContext = useContext(ExpensesContext);

  const [currentBudgetsSharedByMe, setCurrentBudgetsSharedByMe] = useState([]);

  function handleChange(event) {
    setCurrentBudgetsSharedByMe(event.target.value);
  }

  useEffect(() => {
    setCurrentBudgetsSharedByMe(
      authContext.usersList.filter(
        user1 =>
          expensesContext.budgetsSharedByMe.filter(
            user2 => user2.id === user1.id
          ).length > 0
      )
    );
  }, [expensesContext.budgetsSharedByMe, authContext.usersList]);

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">
          Share Your budget
        </InputLabel>
        <Select
          multiple
          value={currentBudgetsSharedByMe}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={() => "Share Your budget"}
          MenuProps={MenuProps}
        >
          {authContext.usersList
            .filter(user => user.email !== authContext.user.email)
            .map(user => (
              <MenuItem key={user.id} value={user}>
                <Checkbox
                  checked={
                    currentBudgetsSharedByMe.filter(
                      share => share.id === user.id
                    ).length > 0
                  }
                />
                <ListItemText primary={user.email} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button
        onClick={() =>
          expensesContext.updateBudgetsSharedByMe(currentBudgetsSharedByMe)
        }
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Submit
      </Button>
    </div>
  );
}
