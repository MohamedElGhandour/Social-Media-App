import React, { useMemo, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonAddDisabledOutlinedIcon from "@material-ui/icons/PersonAddDisabledOutlined";
import PauseIcon from "@material-ui/icons/Pause";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  // changeAvatar,
  follow,
  cancel,
  unfollow,
  // changeCover,
  accept,
  decline,
  uploadImage,
} from "../../../store/actions/index";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import ClearIcon from "@material-ui/icons/Clear";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import { createMuiTheme } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";

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
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  root: {
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    height: 350,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "0 0 15px 15px",
    position: "relative",
  },
  avatar: {
    width: 168,
    height: 168,
    borderRadius: "20%",
    margin: "auto",
    position: "relative",
    top: 224,
  },
  info: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 680,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 1045,
    },
    paddingTop: 43,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
    margin: "auto",
    borderRadius: "0 0 15px 15px",
    width: "auto",
    maxWidth: 1045,
  },
  btns: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 680,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 1045,
    },
    paddingTop: 10,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
    margin: "auto",
    marginTop: 16,
    borderRadius: "15px",
    width: "auto",
    maxWidth: 1045,
  },
  name: {
    textAlign: "center",
    fontWeight: 500,
    padding: "16px 0",
    margin: "auto",
  },
  para: {
    textAlign: "center",
    padding: "0 0 20px 0",
    margin: "auto",
  },
  btnUser: {
    width: "100%",
    background: "#eee",
    color: "#000",
    borderRadius: 8,
  },
  reqBtn: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#1878f2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#216FDB",
    },
  },
  changeCover: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    position: "absolute",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "1.3rem",
    textShadow: "1px 1px #000",
    opacity: 0,
    paddingTop: 137,
    boxSizing: "border-box",
    transition: "all .5s ease-in-out",
    borderRadius: "0 0 15px 15px",
    "&:hover": {
      opacity: 1,
    },
  },
  changeAvatar: {
    width: 168,
    height: 168,
    borderRadius: "20%",
    margin: "auto",
    position: "relative",
    top: 56,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "1.3rem",
    textShadow: "1px 1px #000",
    paddingTop: 74,
    boxSizing: "border-box",
    transition: "all .5s ease-in-out",
    opacity: 0,

    "&:hover": {
      opacity: 1,
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
  Moddelheader: {
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
    width: "100%",
    resize: "none",
    height: "auto",
    overflow: "hidden",
    fontSize: "1.5rem",
    outline: "none",
    padding: "9px 12px",
    lineHeight: 1.1667,
    color: "#566b87",
    cursor: "text",
    minHeight: 60,
    position: "inherit",
    fontWeight: 400,
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
  imgUrl: {
    width: "100%",
    marginTop: 5,
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
    borderRadius: "25%",
    "&:hover": {
      backgroundColor: "rgb(255 255 255 / 50%)",
    },
  },
}));

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#1878f2",
  borderStyle: "dashed",
  backgroundColor: "rgb(24 120 242 / 10%)",
  fontWeight: 900,
  color: "#1878f2",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  marginTop: 15,
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
  backgroundColor: "rgb(0 230 118 / 10%)",
  color: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
  backgroundColor: "rgb(255 23 68 / 10%)",
  color: "#ff1744",
};

const Profile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openAvatar, setOpenAvatar] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [imgURL, setImgURL] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const userId = localStorage.getItem("userId");
  const realUser = useSelector((state) => state.auth);
  let pending = false;
  const { user } = props;
  realUser.pending.forEach((userPending) => {
    if (userPending._id === user._id) {
      pending = true;
    }
  });
  const [btnName, setBtnName] = React.useState("Request");
  const [openAlert, setOpenAlert] = React.useState(false);
  const me = userId === user._id;
  const loading = useSelector((state) => state.ui.loading.changePic);
  const handleOpen = () => setOpen(true);
  const handleOpenAva = () => setOpenAvatar(true);
  const handleClose = () => {
    setOpen(false);
    setOpenAvatar(false);
    setOpenAlert(false);
    setImg(null);
    setImgURL("");
    setDisabled(false);
  };
  const followFun = (id) => dispatch(follow(id));
  const cancelTheRequest = (id) => dispatch(cancel(id));
  const unFollowFun = (id) => dispatch(unfollow(id));
  const acceptFun = (id) => dispatch(accept(id));
  const declineFun = (id) => dispatch(decline(id));
  const changeAvatarReq = () => {
    const image = imgURL ? imgURL : null;
    const data = {
      image: image,
      type: "avatar",
    };
    if (image && !disabled) dispatch(uploadImage(data));
  };
  const changeCoverReq = () => {
    const image = imgURL ? imgURL : null;
    const data = {
      image: image,
      type: "cover",
    };
    if (image && !disabled) dispatch(uploadImage(data));
  };
  React.useEffect(() => {
    if (loading === false) handleClose();
  }, [loading]);
  const handleRemoveImg = () => {
    setImg(null);
    setOpenAlert(false);
    setDisabled(false);
  };
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    if (acceptedFiles.length > 0) {
      setOpenAlert(false);
      setImg(URL.createObjectURL(acceptedFiles[0]));
      setImgURL(acceptedFiles[0]);
      if (acceptedFiles[0].size > 2097152) {
        setDisabled(true);
        setOpenAlert(true);
      }
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  return user ? (
    <div className={classes.root}>
      <div
        className={classes.header}
        style={{ backgroundImage: `url(${user.cover})` }}
      >
        {me && (
          <div className={classes.changeCover} onClick={handleOpen}>
            Change Cover
          </div>
        )}
        {me ? (
          <div>
            <Avatar src={user.avatar} className={classes.avatar} />
            <div className={classes.changeAvatar} onClick={handleOpenAva}>
              Change Avatar
            </div>
          </div>
        ) : (
          <Avatar src={user.avatar} className={classes.avatar} />
        )}
      </div>
      <div style={{ paddingRight: 15, paddingLeft: 15 }}>
        <div className={classes.info}>
          <h1 className={classes.name}>{user.name}</h1>
          <p className={classes.para}>{user.email}</p>
          <p className={classes.para}>
            {user.following.length} Following {user.followers.length} Followers
          </p>
        </div>
        {!me && (
          <div className={classes.btns}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ padding: "5px 10px" }}
              spacing={2}
            >
              <Grid item xs={6}>
                <Grid spacing={2} container>
                  <Grid xs={12} sm={6} item>
                    <Button
                      className={classes.btnUser}
                      onClick={() =>
                        user.pending.includes(userId)
                          ? cancelTheRequest(user._id)
                          : realUser.following.includes(user._id)
                          ? unFollowFun(user._id)
                          : followFun(user._id)
                      }
                      onMouseEnter={
                        user.pending.includes(userId)
                          ? () => setBtnName("Cancel")
                          : null
                      }
                      onMouseLeave={
                        user.pending.includes(userId)
                          ? () => setBtnName("Request")
                          : null
                      }
                      color="inherit"
                    >
                      {user.pending.includes(userId) ? (
                        <React.Fragment>
                          <PauseIcon />
                          <span style={{ paddingLeft: 5 }}>{btnName}</span>
                        </React.Fragment>
                      ) : realUser && realUser.following.includes(user._id) ? (
                        <React.Fragment>
                          <PersonAddDisabledOutlinedIcon />
                          <span style={{ paddingLeft: 5 }}>UNFollow</span>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <PersonAddOutlinedIcon />
                          <span style={{ paddingLeft: 5 }}>Follow</span>
                        </React.Fragment>
                      )}
                    </Button>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <Button className={classes.btnUser} color="inherit">
                      <ForumOutlinedIcon />
                      <span style={{ paddingLeft: 5 }}>chat</span>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {pending && (
                <Grid item xs={6}>
                  <Grid spacing={2} container>
                    <Grid xs={12} sm={6} item>
                      <Button
                        className={classes.reqBtn}
                        onClick={() => acceptFun(user._id)}
                        color="inherit"
                      >
                        Accept
                      </Button>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <Button
                        className={classes.btnUser}
                        onClick={() => declineFun(user._id)}
                        color="inherit"
                      >
                        Decline
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </div>
        )}
      </div>
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
            <h3 id="transition-modal-title" className={classes.Moddelheader}>
              Change Cover
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
                <Grid item className={classes.contanerPost} xs={12}>
                  {img && (
                    <Grid item xs={12} className={classes.imgContainer}>
                      <img
                        alt="test"
                        className={classes.previewImg}
                        src={img}
                      />
                      <IconButton
                        color="inherit"
                        onClick={handleRemoveImg}
                        className={classes.clearImg}
                      >
                        <ClearIcon style={{ color: "#666d75" }} />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <div className="container">
                    <div {...getRootProps({ style })}>
                      <input {...getInputProps()} />
                      <p>
                        <AddPhotoAlternateOutlinedIcon
                          style={{
                            fontWeight: 900,
                            fontSize: "4rem",
                            filter: " drop-shadow(0px 0px 8px)",
                          }}
                        />
                      </p>
                      <p>
                        Drag 'n' drop your image here, or click to select your
                        image
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      cursor: disabled ? "not-allowed" : "pointer",
                      margin: theme.spacing(2, 0, 0),
                    }}
                  >
                    <Button
                      onClick={changeCoverReq}
                      disabled={disabled}
                      style={{
                        color: disabled ? "white" : "white",
                        background: disabled
                          ? "rgb(24 120 242 / 38%)"
                          : "rgb(24, 120, 242)",
                      }}
                      className={classes.btnPost}
                    >
                      Save it!
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openAvatar}
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
        <Fade in={openAvatar}>
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
            <h3 id="transition-modal-title" className={classes.Moddelheader}>
              Change Avatar
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
                <Grid item className={classes.contanerPost} xs={12}>
                  {img && (
                    <Grid item xs={12} className={classes.imgContainer}>
                      <img
                        alt="test"
                        className={classes.previewImg}
                        src={img}
                      />
                      <IconButton
                        color="inherit"
                        onClick={handleRemoveImg}
                        className={classes.clearImg}
                      >
                        <ClearIcon style={{ color: "#666d75" }} />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <div className="container">
                    <div {...getRootProps({ style })}>
                      <input {...getInputProps()} />
                      <p>
                        <AddPhotoAlternateOutlinedIcon
                          style={{
                            fontWeight: 900,
                            fontSize: "4rem",
                            filter: " drop-shadow(0px 0px 8px)",
                          }}
                        />
                      </p>
                      <p>
                        Drag 'n' drop your image here, or click to select your
                        image
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      cursor: disabled ? "not-allowed" : "pointer",
                      margin: theme.spacing(2, 0, 0),
                    }}
                  >
                    <Button
                      onClick={changeAvatarReq}
                      disabled={disabled}
                      style={{
                        color: disabled ? "white" : "white",
                        background: disabled
                          ? "rgb(24 120 242 / 38%)"
                          : "rgb(24, 120, 242)",
                      }}
                      className={classes.btnPost}
                    >
                      Save it!
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
    </div>
  ) : null;
};

export default Profile;
