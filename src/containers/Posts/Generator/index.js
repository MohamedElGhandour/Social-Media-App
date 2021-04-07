import React from "react";
import Card from "@material-ui/core/Card";
import Avatar from "../../../components/UI/Avatar/index";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
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
    color: "#65676b",
    cursor: "pointer",
    userSelect: "none",
  },
  comment: {
    backgroundColor: "#f0f2f5",
    borderRadius: "25px",
    height: "40 auto",
    transition: "all 300ms ease",
    "&:hover": {
      backgroundColor: "#e4e6e9",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    boxShadow:
      "0 12px 28px 0 rgb(0 0 0 / 20%),0 2px 4px 0 rgb(0 0 0 / 10%),inset 0 0 0 1px rgb(255 255 255 / 50%)",
    padding: theme.spacing(3, 2),
    outline: "none",
    border: "none",
    position: "relative",
  },
  header: {
    textAlign: "center",
    marginTop: 0,
    marginBottom: 0,
    borderBottom: "1px solid #ced0d4",
    paddingBottom: 20,
  },
  clear: {
    backgroundColor: "rgb(228 230 235)",
    position: "absolute",
    top: 0,
    right: 0,
    margin: theme.spacing(2, 2, 0, 0),
  },
  rootModal: {
    flexGrow: 1,
  },
  profileName: {
    margin: theme.spacing(0, 0, 0, 2),
  },
  upHeader: {
    margin: theme.spacing(2, 0),
  },
  inputPost: {
    width: "100%",
    resize: "none",
    height: "auto",
    overflow: "hidden",
    fontSize: "1.5rem",
    outline: "none",
    padding: "9px 12px",
    lineHeight: 1.1667,
    color: "rgb(5, 5, 5)",
    cursor: "text",
    position: "inherit",
    fontWeight: 400,
  },
  commentPost: {
    backgroundColor: "#fff",
  },
  form: {
    position: "relative",
  },
  placeholder: {
    position: "absolute",
    fontSize: "1.5rem",
    outline: "none",
    padding: "9px 12px",
    lineHeight: 1.1667,
    color: "#65676b",
    fontWeight: 400,
    userSelect: "none",
  },
  btnPost: {
    backgroundColor: "#1877f2",
    color: "#fff",
    margin: theme.spacing(5, 0, 0),
    textAlign: "center",
    padding: theme.spacing(1.1),
    borderRadius: 7,
    fontWeight: 600,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#216FDB",
    },
  },
  previewImg: {
    width: "100%",
    marginTop: 20,
    margin: "auto",
  },
  imgContainer: {
    position: "relative",
  },
  clearImg: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: " 28px 8px 0px 0px",
    backgroundColor: "rgb(255 255 255)",
    width: 30,
    height: 30,
  },
}));

export default function PostGen(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const content = React.useRef();
  const input = React.useRef();
  const placeHolder = React.useRef();
  const [img, setImg] = React.useState(null);
  const sendPost = () => {
    // const body = {
    //   content: content.current.innerHTML,
    //   name: "Ted",
    //   img: null,
    // };
    // fetch(
    //   "https://socail-media-app-ghandour-default-rtdb.firebaseio.com/posts.json",
    //   {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success", data);
    //   })
    //   .catch((error) => {
    //     console.log("Fail", error);
    //   });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onInput = (event) => {
    const input = event.target;
    !input.innerHTML
      ? (placeHolder.current.style.display = "block")
      : (placeHolder.current.style.display = "none");

    if (input.innerHTML.length >= 86) {
      input.style.lineHeight = 1.3333;
      input.style.fontSize = ".9375rem";
    } else {
      input.style.lineHeight = 1.1667;
      input.style.fontSize = "1.5rem";
    }
  };
  const onFocusOut = () => {
    placeHolder.current.style.color = "#65676b";
  };
  const onFocusIn = () => {
    placeHolder.current.style.color = "#8c8d8e";
  };
  const handleChange = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
  };
  const openInputFile = () => {
    input.current.click();
  };
  const handleRemoveImg = () => {
    setImg(null);
  };
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={2} sm={1}>
              <Avatar />
            </Grid>
            <Grid className={classes.comment} item xs={10} sm={11}>
              <div className={classes.input} onClick={handleOpen}>
                What's on your mind, Ted?
              </div>
            </Grid>
          </Grid>
        </div>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: {
            backgroundColor: "rgb(255 255 255 / 50%)",
          },
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className={classes.header}>
              Create Post
            </h2>
            <IconButton
              color="inherit"
              onClick={handleClose}
              className={classes.clear}
            >
              <ClearIcon style={{ color: "#666d75" }} />
            </IconButton>
            <div className={classes.rootModal}>
              <Grid container>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  className={classes.upHeader}
                >
                  <Grid item>
                    <Avatar />
                  </Grid>
                  <Grid item>
                    <h3 className={classes.profileName}>Ted</h3>
                  </Grid>
                </Grid>
                <Grid className={classes.commentPost} item xs={10} sm={11}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                  >
                    <Grid item xs={10} sm={11}>
                      <div className={classes.form}>
                        <div className={classes.placeholder} ref={placeHolder}>
                          What's on your mind, Ted?
                        </div>
                        <div
                          ref={content}
                          className={classes.inputPost}
                          onFocus={onFocusIn}
                          onBlur={onFocusOut}
                          onInput={onInput}
                          contentEditable="plaintext-only"
                        ></div>
                      </div>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <IconButton onClick={openInputFile} color="inherit">
                        <AttachFileIcon />
                      </IconButton>
                      <input
                        id="file-input"
                        type="file"
                        ref={input}
                        onChange={handleChange}
                        style={{ display: "none" }}
                        accept="image/*"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {img && (
                  <Grid item xs={12} className={classes.imgContainer}>
                    <img alt="test" className={classes.previewImg} src={img} />
                    <IconButton
                      color="inherit"
                      onClick={handleRemoveImg}
                      className={classes.clearImg}
                    >
                      <ClearIcon style={{ color: "#666d75" }} />
                    </IconButton>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <div onClick={sendPost} className={classes.btnPost}>
                    Post
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
