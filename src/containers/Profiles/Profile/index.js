import React from "react";
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
  changeAvatar,
  toggleRequest,
  toggleFollow,
  changeCover,
} from "../../../store/actions/index";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import { useParams } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
    textShadow: "1px 1px #ddd",
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
    textShadow: "1px 1px #ddd",
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
    width: 500,
    boxShadow:
      "0 12px 28px 0 rgb(0 0 0 / 20%),0 2px 4px 0 rgb(0 0 0 / 10%),inset 0 0 0 1px rgb(255 255 255 / 50%)",
    padding: theme.spacing(3, 2),
    outline: "none",
    border: "none",
    position: "relative",
    borderRadius: 15,
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
    color: "#566b87",
    cursor: "text",
    minHeight: 60,
    position: "inherit",
    fontWeight: 400,
  },
  btnPost: {
    backgroundColor: "#1878f2",
    color: "#fff",
    margin: theme.spacing(2, 0, 0),
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
    maxHeight: "400px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "20px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#d6dee1",
      borderRadius: "20px",
      border: "6px solid transparent",
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
    inputPost: {
      minHeight: 100,
    },
  },
  [theme.breakpoints.up("sm")]: {
    paper: {
      width: 500,
      margin: 0,
    },
    inputPost: {
      minHeight: 60,
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

const Profile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const idUser = parseInt(useParams().id);
  const [open, setOpen] = React.useState(false);
  const [openAvatar, setOpenAvatar] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [imgURL, setImgURL] = React.useState("");
  const userId = parseInt(localStorage.getItem("userId"));
  const users = useSelector((state) => state.posts.users);
  const [user] = users.filter((user) => user.id === idUser);
  const [realUser] = users.filter((user) => user.id === userId);
  // const { name, avatar, id, email, following, pending } = props;
  const name = user.name;
  const email = user.email;
  const avatar = user.avatar;
  const cover = user.cover;
  const id = user.id;
  const following = realUser.following;
  const pending = realUser.pending;
  const [btnName, setBtnName] = React.useState("Request");
  const [openAlert, setOpenAlert] = React.useState(false);
  const input = React.useRef();
  const me = userId === id;
  const loading = useSelector((state) => state.ui.loading.changePic);
  const handleOpen = () => setOpen(true);
  const handleOpenAva = () => setOpenAvatar(true);
  const handleClose = () => {
    setOpen(false);
    setOpenAvatar(false);
    setOpenAlert(false);
    setImg(null);
    setImgURL("");
  };
  const request = (id) => {
    dispatch(toggleRequest(userId, id));
  };
  const follow = (id, isAccepted) => {
    dispatch(toggleFollow(id, userId, isAccepted));
  };
  const penddingReq = pending.includes(id);
  const changeAvatarReq = () => {
    const image = imgURL ? imgURL : null;
    dispatch(changeAvatar(id, image));
  };
  const changeCoverReq = () => {
    const image = imgURL ? imgURL : null;
    dispatch(changeCover(id, image));
  };
  React.useEffect(() => {
    if (loading === false) handleClose();
  }, [loading]);
  const handleChange = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    setOpenAlert(true);
  };
  const openInputFile = () => {
    input.current.click();
  };
  const handleRemoveImg = () => {
    setImg(null);
    setOpenAlert(false);
  };
  return (
    <div className={classes.root}>
      <div
        className={classes.header}
        style={{ backgroundImage: `url(${cover})` }}
      >
        {me && (
          <div className={classes.changeCover} onClick={handleOpen}>
            Change Cover
          </div>
        )}
        {me ? (
          <div>
            <Avatar src={avatar} className={classes.avatar} />
            <div className={classes.changeAvatar} onClick={handleOpenAva}>
              Change Avatar
            </div>
          </div>
        ) : (
          <Avatar src={avatar} className={classes.avatar} />
        )}
      </div>
      <div style={{ paddingRight: 15, paddingLeft: 15 }}>
        <div className={classes.info}>
          <h1 className={classes.name}>{name}</h1>
          <p className={classes.para}>{email}</p>
          {!me && (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ padding: 10 }}
              spacing={2}
            >
              <Grid item xs={6}>
                <Grid spacing={2} container>
                  <Grid xs item>
                    <Button
                      className={classes.btnUser}
                      onClick={() => request(id)}
                      color="inherit"
                    >
                      {pending.includes(id) ? (
                        <React.Fragment>
                          <PauseIcon />
                          <span
                            onMouseEnter={() => setBtnName("Cancel")}
                            onMouseLeave={() => setBtnName("Request")}
                            style={{ paddingLeft: 5 }}
                          >
                            {btnName}
                          </span>
                        </React.Fragment>
                      ) : following.includes(id) ? (
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
                  <Grid xs item>
                    <Button className={classes.btnUser} color="inherit">
                      <ForumOutlinedIcon />
                      <span style={{ paddingLeft: 5 }}>chat</span>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {penddingReq && (
                <Grid item xs={6}>
                  <Grid spacing={2} container>
                    <Grid xs item>
                      <Button
                        className={classes.reqBtn}
                        onClick={() => follow(user.id, true)}
                        color="inherit"
                      >
                        Accept
                      </Button>
                    </Grid>
                    <Grid xs item>
                      <Button
                        className={classes.btnUser}
                        onClick={() => follow(user.id, false)}
                        color="inherit"
                      >
                        Decline
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </div>
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
            <h2 id="transition-modal-title" className={classes.Moddelheader}>
              Change Cover
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
                    <Avatar src={avatar} style={{ borderRadius: "25%" }} />
                  </Grid>
                  <Grid item>
                    <h3 className={classes.profileName}>{name}</h3>
                  </Grid>
                </Grid>
                <Grid item className={classes.contanerPost} xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                  >
                    <Grid item xs={2} sm={1}>
                      <IconButton onClick={openInputFile} color="inherit">
                        <AddPhotoAlternateOutlinedIcon
                          style={{ color: "#46bd62" }}
                        />
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
                  <ThemeProvider theme={theme}>
                    <TextField
                      className={classes.imgUrl}
                      value={imgURL}
                      onChange={(e) => setImgURL(e.target.value)}
                      id="outlined-basic"
                      variant="outlined"
                      label="Image URL"
                    />
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={changeCoverReq} className={classes.btnPost}>
                    Save it!
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 10 }}>
                  <Collapse in={openAlert}>
                    <Alert
                      severity="warning"
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
                      Uploading Files doesn't work for now but can use Image
                      URL.
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
            <h2 id="transition-modal-title" className={classes.Moddelheader}>
              Change Avatar
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
                    <Avatar src={avatar} style={{ borderRadius: "25%" }} />
                  </Grid>
                  <Grid item>
                    <h3 className={classes.profileName}>{name}</h3>
                  </Grid>
                </Grid>
                <Grid item className={classes.contanerPost} xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                  >
                    <Grid item xs={2} sm={1}>
                      <IconButton onClick={openInputFile} color="inherit">
                        <AddPhotoAlternateOutlinedIcon
                          style={{ color: "#46bd62" }}
                        />
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
                  <TextField
                    className={classes.imgUrl}
                    value={imgURL}
                    onChange={(e) => setImgURL(e.target.value)}
                    variant="outlined"
                    label="Image URL"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={changeAvatarReq} className={classes.btnPost}>
                    Save it!
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 10 }}>
                  <Collapse in={openAlert}>
                    <Alert
                      severity="warning"
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
                      Uploading Files doesn't work for now but can use Image
                      URL.
                    </Alert>
                  </Collapse>
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Profile;
