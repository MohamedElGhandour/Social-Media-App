import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/actions/index";
import { NavLink } from "react-router-dom";

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
    borderRadius: 10,
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
    color: "#a4afbe",
    userSelect: "none",
  },
}));

export default function ComGen(props) {
  const classes = useStyles();
  const placeholder = React.useRef();
  const body = React.useRef();
  const dispatch = useDispatch();
  const avatar = localStorage.getItem("avatar");
  const userId = localStorage.getItem("userId");

  const onInput = (event) => {
    const input = event.target;
    !input.innerHTML
      ? (placeholder.current.style.display = "block")
      : (placeholder.current.style.display = "none");
  };
  const onFocusOut = () => {
    placeholder.current.style.color = "#a4afbe";
  };
  const onFocusIn = () => {
    placeholder.current.style.color = "#8c8d8e";
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && body.current.innerHTML.trim() !== "") {
      const newComment = {
        body: body.current.innerHTML,
        postId: props.id,
      };
      dispatch(addComment(newComment));
      body.current.innerHTML = "";
      placeholder.current.style.display = "block";
    }
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2} sm={1}>
          <NavLink to={`/profile/${userId}`}>
            <Avatar src={avatar} style={{ borderRadius: "25%" }} />
          </NavLink>
        </Grid>
        <Grid className={classes.comment} item xs={10} sm={11}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item xs={11}>
              <form
                className={classes.form}
                onSubmit={() => console.log("test")}
              >
                <div ref={placeholder} className={classes.placeholder}>
                  write a comment...
                </div>
                <div
                  className={classes.input}
                  onFocus={onFocusIn}
                  onBlur={onFocusOut}
                  onInput={onInput}
                  onKeyUp={handleKeyDown}
                  ref={body}
                  contentEditable="plaintext-only"
                ></div>
                <input type="submit" hidden />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
