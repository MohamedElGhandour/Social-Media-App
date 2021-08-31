import React from "react";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import { sendNewPost, uploadImage } from "../../../store/actions/index";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#1878f2",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 680,
    width: "100%",
    margin: "16px auto",
    borderRadius: 15,
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
    backgroundColor: "#fff",
  },
  media: {
    height: 190,
  },
  root: {
    flexGrow: 1,
    margin: 10,
  },
  input: {
    resize: "none",
    height: "auto",
    fontSize: ".9375rem",
    outline: "none",
    padding: "9px 12px",
    lineHeight: 1.6,
    color: "#a4afbe",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  comment: {
    backgroundColor: "#fff",
    height: "40px",
    overflow: "none",
    transition: "all 300ms ease",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "#f0f2f5",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 680,
    boxShadow:
      "0 12px 28px 0 rgb(0 0 0 / 20%),0 2px 4px 0 rgb(0 0 0 / 10%),inset 0 0 0 1px rgb(255 255 255 / 50%)",
    padding: theme.spacing(3, 2),
    outline: "none",
    border: "none",
    position: "relative",
    borderRadius: 15,
    boxSizing: "border-box",
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
    borderRadius: "25%",
    width: 40,
    height: 40,
    margin: theme.spacing(1.5, 2, 0, 0),
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
    resize: "none",
    height: "auto",
    overflow: "hidden",
    fontSize: "1.5rem",
    outline: "none",
    padding: "9px 12px",
    lineHeight: 1.1667,
    color: "#566b87",
    cursor: "text",
    minHeight: 100,
    position: "inherit",
    fontWeight: 400,
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
    color: "#a4afbe",
    fontWeight: 400,
    minHeight: 60,
    userSelect: "none",
  },
  btnPost: {
    backgroundColor: "#1878f2",
    color: "#fff",
    textAlign: "center",
    padding: theme.spacing(1.1),
    borderRadius: 7,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
    transition: "all .5s ease",
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
    width: 35,
    height: 15,
    borderRadius: "25%",
    "&:hover": {
      backgroundColor: "rgb(228 230 235)",
    },
  },
  contanerPost: {
    maxHeight: "600px",
    boxSizing: "border-box",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#d6dee1",
      borderRadius: "20px",
      border: "0px solid transparent",
      backgroundClip: "content-box",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#a8bbbf",
    },
  },
  fab: {
    position: "fixed",
    width: 50,
    height: 50,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 100,
    color: "#fff",
    backgroundColor: "#1878f2",
    borderRadius: "25%",
    "&:hover": {
      backgroundColor: "#216FDB",
    },
  },
  [theme.breakpoints.up("xs")]: {
    paper: {
      width: "100%",
      margin: "20px",
    },
    contanerPost: {
      maxHeight: "400px",
    },
  },
  [theme.breakpoints.up("sm")]: {
    paper: {
      width: "80%",
      margin: "20px",
    },
  },
  [theme.breakpoints.up("md")]: {
    paper: {
      width: 680,
      margin: 0,
    },
  },
}));

export default function PostGen(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const content = React.useRef();
  const input = React.useRef();
  const placeHolder = React.useRef();
  const [img, setImg] = React.useState(null);
  const [imgPath, setImgPath] = React.useState(null);
  const [openAlert, setOpenAlert] = React.useState(false);
  const avatar = localStorage.getItem("avatar");
  const name = localStorage.getItem("name");
  const loading = useSelector((state) => state.ui.loading.sendPost);
  React.useEffect(() => {
    if (loading === false) handleClose();
  }, [loading]);
  const sendPost = () => {
    const body = content.current.innerText;
    const image = imgPath ? imgPath : null;
    const data = {
      image: image,
      body: body,
      type: "post",
    };
    image
      ? !disabled && dispatch(uploadImage(data))
      : dispatch(sendNewPost(data));
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImg(null);
    setImgPath(null);
    setOpenAlert(false);
    setDisabled(false);
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
    placeHolder.current.style.color = "#a4afbe";
  };
  const onFocusIn = () => {
    placeHolder.current.style.color = "#8c8d8e";
  };
  const handleChange = (event) => {
    setOpenAlert(false);
    setImg(URL.createObjectURL(event.target.files[0]));
    setImgPath(event.target.files[0]);
    if (event.target.files[0].size > 2097152) {
      setDisabled(true);
      setOpenAlert(true);
    }
  };
  const openInputFile = () => {
    input.current.click();
  };
  const handleRemoveImg = () => {
    setImg(null);
    setOpenAlert(false);
    setDisabled(false);
  };
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={2} sm={1}>
              <Avatar src={avatar} style={{ borderRadius: "25%" }} />
            </Grid>
            <Grid item className={classes.comment} xs={10} sm={11}>
              <div className={classes.input} onClick={handleOpen}>
                What's new, {name}?
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
            {loading && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.5)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 100,
                  borderRadius: 15,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <CircularProgress style={{ color: "#1878f2" }} />
                </span>
              </div>
            )}
            <h3 id="transition-modal-title" className={classes.header}>
              Create Post
            </h3>
            <Fab
              color="inherit"
              onClick={handleClose}
              className={classes.clear}
            >
              <ClearIcon style={{ color: "#666d75" }} />
            </Fab>
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
                    <Avatar src={avatar} style={{ borderRadius: "25%" }} />
                  </Grid>
                  <Grid item>
                    <h4 className={classes.profileName}>{name}</h4>
                  </Grid>
                </Grid>
                <Grid item className={classes.contanerPost} xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                  >
                    <Grid item xs={12}>
                      <div className={classes.form}>
                        <div className={classes.placeholder} ref={placeHolder}>
                          What's on your mind, {name}?
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
                  </Grid>
                  {img && (
                    <Grid item xs={12} className={classes.imgContainer}>
                      <img
                        alt="test"
                        className={classes.previewImg}
                        src={img}
                      />
                      <Fab
                        color="inherit"
                        onClick={handleRemoveImg}
                        className={classes.clearImg}
                      >
                        <ClearIcon style={{ color: "#666d75" }} />
                      </Fab>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{
                      padding: "0 10px",
                      border: "solid 1px rgb(206 208 212)",
                      borderRadius: 7,
                      boxShadow: "0 1px 2px rgb(0 0 0 / 10%)",
                      marginTop: 10,
                    }}
                  >
                    <Grid item>
                      <p
                        style={{
                          fontWeight: 500,
                          fontSize: 16,
                          cursor: "pointer",
                        }}
                        onClick={openInputFile}
                      >
                        Add Image into Post
                      </p>
                    </Grid>
                    <Grid item>
                      <Fab
                        onClick={openInputFile}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "25%",
                          boxShadow: "none",
                          background: "none",
                        }}
                        color="inherit"
                      >
                        <AddPhotoAlternateOutlinedIcon
                          style={{
                            color: "#1878f2",
                            width: 25,
                            height: 25,
                          }}
                        />
                      </Fab>
                    </Grid>
                  </Grid>
                  <input
                    id="file-input"
                    type="file"
                    ref={input}
                    onChange={handleChange}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      cursor: disabled ? "not-allowed" : "pointer",
                      margin: theme.spacing(2, 0, 0),
                    }}
                  >
                    <Button
                      onClick={sendPost}
                      disabled={disabled}
                      style={{
                        color: disabled ? "white" : "white",
                        background: disabled
                          ? "rgb(24 120 242 / 38%)"
                          : "rgb(24, 120, 242)",
                      }}
                      className={classes.btnPost}
                    >
                      Post it!
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 10 }}>
                  <Collapse in={openAlert}>
                    <Alert
                      severity="error"
                      className={classes.alert}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpenAlert(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      Maximum allowed file size for upload is 2m.
                    </Alert>
                  </Collapse>
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
      <Fab
        aria-label={"add post"}
        className={classes.fab}
        onClick={handleOpen}
        color="inherit"
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
