import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GoogleButton from "react-google-button";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(2),
    width: 60,
    height: 60,
    backgroundColor: "rgba(19, 145, 135, 0.85)"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing()
  },
  submit: {
    marginTop: theme.spacing(3),
    backgroundColor: "rgba(19, 145, 135, 0.65)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(19, 145, 135, 0.85)"
    }
  },
  typography: {
    margin: theme.spacing(2)
  },
  navlink: {
    textDecoration: "none",
    color: "#0066ff",
    "&:hover": {
      color: "#000099"
    }
  }
});

function SignIn(props) {
  const authContext = useContext(AuthContext);
  const { classes } = props;

  const [forgotPassword, setForgotPassword] = useState(false);

  const handleChange = () => setForgotPassword(!forgotPassword);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to Financial Planner
        </Typography>
        <form
          className={classes.form}
          onSubmit={
            forgotPassword
              ? authContext.resetPasswordViaEmail
              : authContext.handleSignIn
          }
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={authContext.email}
              onChange={event => authContext.setEmail(event.target.value)}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox checked={forgotPassword} onChange={handleChange} />
            }
            label="Forgot your password ?"
          />
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={authContext.password}
              onChange={event => authContext.setPassword(event.target.value)}
              disabled={forgotPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            {forgotPassword ? "Reset password" : "Sign in"}
          </Button>
        </form>
        <Typography
          className={classes.typography}
          component="p"
          variant="body2"
        >
          New to Financial Planner?{" "}
          <NavLink className={classes.navlink} to="/sign-up">
            Create an account.
          </NavLink>
        </Typography>
        <GoogleButton
          style={{ width: "100%" }}
          type="light"
          onClick={authContext.handleSignInByGoogle}
        />
      </Paper>
    </main>
  );
}

export default withStyles(styles)(SignIn);
