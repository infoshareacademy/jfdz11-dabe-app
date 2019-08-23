import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Home from "@material-ui/icons/Home";
import AttachMoney from "@material-ui/icons/AttachMoney";
import PieChart from "@material-ui/icons/PieChart";
import Face from "@material-ui/icons/Face";
import Style from "@material-ui/icons/Style";
import { NavLink } from "react-router-dom";
import { list, navLink, appTitle, versioning } from "./Menu.module.css";

export default function Menu() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const icons = [<Home />, <AttachMoney />, <Style />, <PieChart />, <Face />];
  const scenesPaths = ["/dashboard", "/finances", "/review", "/shared"];

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <p className={appTitle}>Financial Planner</p>
      <p className={versioning}>v1.0.0</p>
      <Divider />
      <List>
        {["Dashboard", "Finances", "Review", "Shared Budgets"].map(
          (text, index) => (
            <NavLink key={text} to={scenesPaths[index]} className={navLink}>
              <ListItem button>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          )
        )}
      </List>
      <Divider />
      <List>
        <NavLink key="Profile" to="/profile" className={navLink}>
          <ListItem button>
            <ListItemIcon>{icons[icons.length - 1]}</ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  return (
    <>
      <MenuIcon onClick={toggleDrawer("left", true)} />
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </>
  );
}
