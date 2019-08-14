import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import avatarPlaceholder from "../../assets/avatar-placeholder.jpg";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ImageIcon from "@material-ui/icons/Image";
import { AuthContext } from "../../contexts/AuthContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`
  },
  typography: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`
  },
  userData: {
    alignSelf: "center"
  },
  bigAvatar: {
    width: 120,
    height: 120,
    margin: "0 auto 10px"
  },
  handleInput: {
    width: "60%",
    marginTop: theme.spacing(1),
    marginButtom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-around"
  },
  icons: {
    backgroundColor: "rgba(19, 145, 135, 0.65)",
    "&:hover": {
      backgroundColor: "rgba(19, 145, 135, 1)"
    }
  },
  linearProgress: {
    width: "100%",
    height: 20
  },
  submit: {
    backgroundColor: "rgba(19, 145, 135, 0.65)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(19, 145, 135, 0.85)"
    }
  },
  expansionPanel: {
    marginTop: 10
  }
});

function Profile(props) {
  const authContext = useContext(AuthContext);
  const { classes } = props;
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
        <Typography className={classes.typography} component="h1" variant="h4">
          Profile
        </Typography>
        <Typography className={classes.userData} component="h4" variant="h6">
          Email: {authContext.user.email}
        </Typography>
        <Typography className={classes.userData} component="h4" variant="h6">
          Login: {authContext.user.displayName}
        </Typography>
        <Avatar
          src={
            authContext.avatarUrl ? authContext.avatarUrl : avatarPlaceholder
          }
          className={classes.bigAvatar}
        />
        <LinearProgress
          variant="determinate"
          value={authContext.completed}
          className={classes.linearProgress}
        />
        <div className={classes.handleInput}>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            onChange={event => authContext.setFile(event.target.files[0])}
          />
          <Fab
            size="medium"
            className={classes.icons}
            component="span"
            onClick={authContext.addAvatar}
          >
            <AddIcon />
          </Fab>
          <label htmlFor="raised-button-file">
            <Fab size="medium" className={classes.icons} component="span">
              <ImageIcon />
            </Fab>
          </label>
          <Fab
            size="medium"
            className={classes.icons}
            component="span"
            onClick={authContext.removeAvatar}
          >
            <RemoveIcon />
          </Fab>
        </div>

        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Change your password :</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form
              className={classes.form}
              onSubmit={authContext.passwordUpdate}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password1">Password</InputLabel>
                <Input
                  name="password1"
                  type={showPassword ? "text" : "password"}
                  id="password1"
                  autoComplete="current-password"
                  value={authContext.password1}
                  onChange={event =>
                    authContext.setPassword1(event.target.value)
                  }
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
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password2">Password</InputLabel>
                <Input
                  name="password2"
                  type={showPassword ? "text" : "password"}
                  id="password2"
                  autoComplete="current-password"
                  value={authContext.password2}
                  onChange={event =>
                    authContext.setPassword2(event.target.value)
                  }
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
                disabled={authContext.isInvalid}
                className={classes.submit}
              >
                Update password
              </Button>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(Profile);
