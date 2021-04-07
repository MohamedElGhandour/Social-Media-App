import React from "react";
import Avatar from "../../../components/UI/Avatar/index";
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
    position: "inherit",
  },
  comment: {
    backgroundColor: "#f0f2f5",
    borderRadius: "25px",
    height: "40 auto",
  },
  form: {
    position: "relative",
  },
  placeholder: {
    position: "absolute",
    fontSize: ".9375rem",
    outline: "none",
    padding: "9px 12px",
    lineHeight: 1.6,
    color: "#65676b",
    userSelect: "none",
  },
}));

export default function ComGen(props) {
  const classes = useStyles();

  const onInput = (event) => {
    const input = event.target;
    const placeHolder = document.querySelector(`.${classes.placeholder}`);
    !input.innerHTML
      ? (placeHolder.style.display = "block")
      : (placeHolder.style.display = "none");
  };
  const onFocusOut = () => {
    const placeHolder = document.querySelector(`.${classes.placeholder}`);
    placeHolder.style.color = "#65676b";
  };
  const onFocusIn = () => {
    const placeHolder = document.querySelector(`.${classes.placeholder}`);
    placeHolder.style.color = "#8c8d8e";
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2} sm={1}>
          <Avatar online />
        </Grid>
        <Grid className={classes.comment} item xs={10} sm={11}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item xs={10} sm={11}>
              <form className={classes.form}>
                <div className={classes.placeholder}>write a comment...</div>
                <div
                  className={classes.input}
                  onFocus={onFocusIn}
                  onBlur={onFocusOut}
                  onInput={onInput}
                  contentEditable="plaintext-only"
                ></div>
                <input hidden />
              </form>
            </Grid>
            <Grid item xs={2} sm={1}>
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
