import React from "react";
import Avatar from "../../UI/Avatar/Badge/index";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 10,
  },
  input: {
    width: "100%",
    resize: "none",
    height: "auto",
    overflow: "hidden",
    fontSize: ".9375rem",
    outline: "none",
    padding: "9px 12px",
    lineHeight: 1.6,
    color: "rgb(5, 5, 5)",
    cursor: "text",
  },
  comment: {
    backgroundColor: "#f0f2f5",
    borderRadius: "25px",
    height: "40 auto",
  },
}));
export default function ComGen(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2} sm={1}>
          <Avatar />
        </Grid>
        <Grid className={classes.comment} item xs={10} sm={11}>
          <Grid container>
            <Grid item xs={11}>
              <form>
                <div className={classes.input} contentEditable></div>
              </form>
            </Grid>
            <Grid item xs={1}>
              <IconButton color="inherit">
                <AttachFileIcon style={{ fontSize: "18px" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
