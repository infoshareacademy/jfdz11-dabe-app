import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Icon from "@material-ui/core/Icon";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Saldo"
        value="recents"
        icon={<Icon>attach_money</Icon>}
      />
      <BottomNavigationAction
        label="Period"
        value="Period"
        icon={<Icon>calendar_today</Icon>}
      />
      <BottomNavigationAction
        label="Income"
        value="Income"
        icon={<Icon>account_balance_wallet </Icon>}
      />
      <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<Icon>folder</Icon>}
      />
    </BottomNavigation>
  );
}
