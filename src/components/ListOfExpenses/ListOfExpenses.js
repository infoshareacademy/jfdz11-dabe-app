import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "30px",
    backgroundColor: theme.palette.background.paper,
    height: 490,
    border: "1px solid grey",
    boxShadow: "1px 1px 10px grey"
  }
}));

function Row(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

Row.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object
};

export default function ListOfExpenses(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={490} width={600} itemSize={40} itemCount={50}>
        {Row}
      </FixedSizeList>
    </div>
  );
}
