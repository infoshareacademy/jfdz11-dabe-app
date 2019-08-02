import React, { useContext } from "react";
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
import { AuthContext } from "../../contexts/AuthContext";

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
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(3),
    backgroundColor: "rgba(19, 145, 135, 0.85)"
  }
});

function SignUp(props) {
  const authContext = useContext(AuthContext);
  const { classes } = props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up to Financial Planner
        </Typography>
        <form className={classes.form} onSubmit={authContext.handleSignUp}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="login">Login</InputLabel>
            <Input
              id="login"
              name="login"
              autoFocus
              value={authContext.login}
              onChange={event => authContext.setLogin(event.target.value)}
            />
          </FormControl>
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
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={authContext.password}
              onChange={event => authContext.setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(SignUp);
