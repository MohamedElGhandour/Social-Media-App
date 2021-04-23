import React from "react";
import Avatar from "../../../components/UI/Avatar/index";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addComment } from "../../../store/actions/index";

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
  const placeholder = React.useRef();
  const body = React.useRef();
  const dispatch = useDispatch();
  const onInput = (event) => {
    const input = event.target;
    !input.innerHTML
      ? (placeholder.current.style.display = "block")
      : (placeholder.current.style.display = "none");
  };
  const onFocusOut = () => {
    placeholder.current.style.color = "#65676b";
  };
  const onFocusIn = () => {
    placeholder.current.style.color = "#8c8d8e";
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && body.current.innerHTML !== "") {
      const newComment = {
        body: body.current.innerHTML,
        avatar: props.avatar,
        timestamp: new Date().getTime(),
        author: "Mohamed Elghandour",
        postId: props.global.id,
      };
      const newPost = { ...props.global };
      dispatch(addComment(newPost, newComment));
      body.current.innerHTML = "";
      placeholder.current.style.display = "block";
    }
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2} sm={1}>
          <Avatar online avatar={props.avatar} />
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
