import React, { useContext } from "react";
import { toolbar } from "./Navigation.module.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "../Menu";
import { NavLink } from "react-router-dom";
import { SignOut } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import avatarPlaceholder from "../../assets/avatar-placeholder.jpg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  typography: {
    flexGrow: 1,
    textAlign: "end"
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "0 20px"
  }
}));

export default function Navigation(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "rgba(19, 145, 135, 0.85)" }}
      >
        <Toolbar className={toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <Menu />
          </IconButton>
          <Typography
            className={classes.typography}
            component="p"
            variant="body2"
          >
            Sign in as{" "}
            <strong>{authContext.login || authContext.user.displayName}</strong>
          </Typography>
          <NavLink to="/profile">
            <Avatar
              src={
                authContext.avatarUrl
                  ? authContext.avatarUrl
                  : avatarPlaceholder
              }
              className={classes.bigAvatar}
            />
          </NavLink>
          <SignOut />
        </Toolbar>
      </AppBar>
    </div>
  );
}
