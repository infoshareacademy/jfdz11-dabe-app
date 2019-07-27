import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import avatarPlaceholder from "../../assets/avatar-placeholder.jpg";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ImageIcon from "@material-ui/icons/Image";

const styles = () => ({
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "0 auto"
  }
});

function Profile(props) {
  const { classes } = props;
  return (
    <>
      <Typography component="h1" variant="h4">
        Profile
      </Typography>
      <div style={{ margin: "20px" }}>
        <Avatar
          src={avatarUrl ? avatarUrl : avatarPlaceholder}
          className={classes.bigAvatar}
        />
        <div style={{ margin: "20px" }}>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={event => setFile(event.target.files[0])}
          />
          <label htmlFor="raised-button-file">
            <Fab size="small" color="default" component="span">
              <ImageIcon />
            </Fab>
          </label>
          {file && `${file.name}`}
          <Fab
            size="small"
            color="primary"
            component="span"
            onClick={addAvatar}
          >
            <AddIcon />
          </Fab>
          <Fab
            size="small"
            color="secondary"
            component="span"
            onClick={removeAvatar}
          >
            <RemoveIcon />
          </Fab>
        </div>
      </div>
      <Typography component="h3" variant="h6">
        {(user && user.email) || "email"}
      </Typography>
      <Typography component="h3" variant="h6">
        {(user && user.uid) || "user name"}
      </Typography>
      <div style={{ margin: "20px" }}>
        <Fab
          size="small"
          color="primary"
          aria-label="Edit"
          className={classes.fab}
        >
          <EditIcon />
        </Fab>
      </div>
    </>
  );
}

export default withStyles(styles)(Profile);
