import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import avatarPlaceholder from "../../assets/avatar-placeholder.jpg";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ImageIcon from "@material-ui/icons/Image";
import { AuthContext } from "../../contexts/AuthContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

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
  typography: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "0 auto 10px"
  },
  linearProgress: {
    width: "100%",
    height: 20
  }
});

function Profile(props) {
  const authContext = useContext(AuthContext);
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography className={classes.typography} component="h1" variant="h4">
          Profile
        </Typography>
        <Avatar
          src={
            authContext.avatarUrl ? authContext.avatarUrl : avatarPlaceholder
          }
          className={classes.bigAvatar}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          onChange={event => authContext.setFile(event.target.files[0])}
        />
        <label htmlFor="raised-button-file">
          <Fab size="small" color="secondary" component="span">
            <ImageIcon />
          </Fab>
        </label>
        <Typography component="p" variant="caption">
          {authContext.file && `${authContext.file.name}`}
        </Typography>
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={authContext.completed}
          className={classes.linearProgress}
        />
        <Fab
          size="small"
          color="primary"
          component="span"
          onClick={authContext.addAvatar}
        >
          <AddIcon />
        </Fab>
        <Fab
          size="small"
          color="secondary"
          component="span"
          onClick={authContext.removeAvatar}
        >
          <RemoveIcon />
        </Fab>
        <Typography component="h3" variant="h6">
          {authContext.user.email}
        </Typography>
        <Typography component="h3" variant="h6">
          {authContext.user.displayName}
        </Typography>
        <Fab
          size="small"
          color="primary"
          aria-label="Edit"
          className={classes.fab}
        >
          <EditIcon />
        </Fab>
      </Paper>
      <form className={classes.form} onSubmit={authContext.passwordUpdate}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password1">Password</InputLabel>
          <Input
            name="password1"
            type="password"
            id="password1"
            autoComplete="current-password"
            value={authContext.password1}
            onChange={event => authContext.setPassword1(event.target.value)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password2">Password</InputLabel>
          <Input
            name="password2"
            type="password"
            id="password2"
            autoComplete="current-password"
            value={authContext.password2}
            onChange={event => authContext.setPassword2(event.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={authContext.isInvalid}
          className={classes.submit}
        >
          Update password
        </Button>
        {authContext.isInvalid ? (
          <Typography component="h3" variant="h6">
            Passwords must be identical
          </Typography>
        ) : null}
      </form>
    </main>
  );
}

export default withStyles(styles)(Profile);
