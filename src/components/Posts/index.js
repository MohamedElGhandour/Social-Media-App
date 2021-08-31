import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Button,
  Avatar,
  Collapse,
  Modal,
  Backdrop,
  Fade,
  AppBar,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemIcon,
  Fab,
} from "@material-ui/core/";
import {
  MoreHoriz,
  FavoriteBorderOutlined,
  Favorite,
  ChatBubbleOutlineOutlined,
} from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import CommentGenerator from "../../containers/ComGenerator/index";
import Comment from "../Comments/index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Tooltip from "../../containers/Tooltip/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#1878f2",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#1878f2",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 680,
    width: "100%",
    margin: "16px auto",
    borderRadius: 15,
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
  },
  media: {
    height: 190,
  },
  btn: {
    textAlign: "center",
    width: "calc(50% - 10px)",
    color: "#69676b",
    borderRadius: 8,
    textTransform: "capitalize",
    margin: "0 5px",
  },
  btnGroup: {
    margin: "10px 16px",
    padding: "5px 0",
    width: "auto",
  },
  count: {
    margin: "0px 20px",
    padding: "5px 0",
    width: "auto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  reaction: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  user: {
    borderRadius: 10,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    boxShadow: theme.shadows[5],
    borderRadius: 15,
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
      width: "90%",
    },
  },
}));

export default function Post(props) {
  const [comment, setComment] = React.useState(false);
  const [love, setLove] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { loading = false } = props;
  const { loves, comments, toggleLove, id } = props;
  const post = () => {
    toggleLove(id);
  };
  const userId = localStorage.getItem("userId");
  React.useEffect(() => {
    loves &&
      loves.forEach((user) => {
        user._id === userId ? setLove(true) : setLove(false);
      });
    loves && !loves.length && setLove(false);
  }, [loves, userId]);
  const handleChange = (event, newValue) => setValue(newValue);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openLove = () => {
    handleOpen();
    handleChange(null, 0);
  };
  const openComment = () => {
    handleOpen();
    handleChange(null, 1);
  };
  const loadingNewComment = useSelector(
    (state) => state.ui.loading.sendComment
  );
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            ) : (
              <Tooltip
                _id={props.userId}
                name={props.name}
                avatar={props.avatar}
                pending={props.pending}
                placement="top"
              >
                <NavLink to={`/profile/${props.userId}`}>
                  <Avatar src={props.avatar} style={{ borderRadius: "25%" }} />
                </NavLink>
              </Tooltip>
            )
          }
          action={
            loading ? null : (
              <Fab
                style={{
                  borderRadius: "25%",
                  boxShadow: "none",
                  background: "none",
                  width: 40,
                  height: 40,
                }}
                aria-label="settings"
              >
                <MoreHoriz />
              </Fab>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Typography
                variant="body1"
                style={{ color: "#000", fontWeight: "bold" }}
                component="p"
              >
                <Tooltip
                  _id={props.userId}
                  name={props.name}
                  avatar={props.avatar}
                  pending={props.pending}
                  placement="top"
                >
                  <NavLink
                    to={`/profile/${props.userId}`}
                    style={{ color: "rgb(29, 58, 95)", textDecoration: "none" }}
                  >
                    {props.name}
                  </NavLink>
                </Tooltip>
              </Typography>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              new Date(props.createdAt).toUTCString()
            )
          }
        />
        <CardContent style={{ padding: "0 20px 16px 20px" }}>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          ) : (
            <Typography
              variant="body2"
              style={{ color: "#566b87" }}
              component="p"
            >
              {props.body}
            </Typography>
          )}
        </CardContent>
        {loading ? (
          <Skeleton
            animation="wave"
            variant="rect"
            style={{ marginBottom: 6 }}
            className={classes.media}
          />
        ) : props.image ? (
          <div style={{ margin: "auto 20px" }}>
            <img
              src={props.image}
              style={{ cursor: "pointer", borderRadius: "20px" }}
              alt="img"
              width="100%"
            />
          </div>
        ) : null}
        {loading
          ? null
          : !(loves.length === 0 && comments.length === 0) && (
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.count}
              >
                <div
                  className={classes.reaction}
                  onClick={openLove}
                  style={{
                    color: "#1878f2",
                    fontSize: ".9375rem",
                    cursor: "pointer",
                  }}
                >
                  {loves.length > 0 ? (
                    <React.Fragment>
                      <Favorite
                        style={{
                          fontSize: ".9375rem",
                          position: "relative",
                          top: 1,
                          marginRight: 5,
                        }}
                      />
                      {loves.length}
                    </React.Fragment>
                  ) : null}
                </div>
                <div
                  className={classes.reaction}
                  onClick={openComment}
                  style={{ fontSize: ".9375rem", cursor: "pointer" }}
                >
                  {comments.length === 1 ? (
                    <React.Fragment>{comments.length} Comment</React.Fragment>
                  ) : comments.length > 1 ? (
                    <React.Fragment>{comments.length} Comments</React.Fragment>
                  ) : null}
                </div>
              </Grid>
            )}
        {loading ? (
          <CardContent>
            <Skeleton
              animation="wave"
              height={10}
              style={{
                marginBottom: 6,
              }}
              width="100%"
            />
          </CardContent>
        ) : (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.btnGroup}
          >
            {love ? (
              <Button
                className={classes.btn}
                onClick={() => post()}
                style={{ color: "#1878f2" }}
              >
                <Favorite />
                <span style={{ paddingLeft: 5 }}>Love</span>
              </Button>
            ) : (
              <Button className={classes.btn} onClick={() => post()}>
                <FavoriteBorderOutlined />
                <span style={{ paddingLeft: 5 }}>Love</span>
              </Button>
            )}
            <Button className={classes.btn} onClick={() => setComment(true)}>
              <ChatBubbleOutlineOutlined />
              <span style={{ paddingLeft: 5 }}>Comment</span>
            </Button>
          </Grid>
        )}
        {loading ? null : (
          <Collapse in={comment}>
            <CommentGenerator id={props.id} />
            {comments.map((comment) => (
              <Comment
                avatar={comment.user.avatar}
                body={comment.body}
                key={comment._id}
                author={comment.user.name}
                userId={comment.user._id}
                pending={comment.user.pending}
              />
            ))}
            {loadingNewComment && (
              <div style={{ padding: 10 }}>
                <CircularProgress
                  style={{
                    color: "#1878f2",
                    marginLeft: "auto",
                    display: "block",
                  }}
                />
              </div>
            )}
          </Collapse>
        )}
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
            <AppBar
              style={{
                borderRadius: "15px 15px 0 0",
              }}
              position="static"
              color="inherit"
            >
              <ThemeProvider theme={theme}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  style={{
                    borderRadius: "15px 15px 0 0",
                  }}
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="simple tabs example"
                >
                  <Tab
                    label="Loves"
                    style={{ width: "50%" }}
                    icon={<Favorite />}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Comments"
                    style={{ width: "50%" }}
                    icon={<ChatBubbleIcon />}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </ThemeProvider>
            </AppBar>
            <TabPanel value={value} index={0}>
              <List
                component="nav"
                style={{
                  maxHeight: 400,
                  overflow: "auto",
                  width: 350,
                  borderRadius: 15,
                }}
                aria-label="main mailbox folders"
              >
                {loves && loves.length === 0 && (
                  <div style={{ textAlign: "center" }}>Be First Love</div>
                )}
                {loves &&
                  loves.map((user) => (
                    <Tooltip
                      key={user._id}
                      _id={user._id}
                      name={user.name}
                      avatar={user.avatar}
                      pending={user.pending}
                      placement="top"
                    >
                      <div>
                        <NavLink
                          to={`/profile/${user._id}`}
                          style={{
                            textDecoration: "none",
                            color: "#1d3a5f",
                            fontWeight: 500,
                          }}
                        >
                          <ListItem className={classes.user} button>
                            <ListItemIcon>
                              <Avatar
                                src={user.avatar}
                                style={{ borderRadius: "25%" }}
                              />
                            </ListItemIcon>
                            <div
                              style={{
                                flex: "1 1 auto",
                                minWidth: 0,
                                marginTop: 4,
                                marginBottom: 4,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "1rem",
                                  fontFamily: ` "Roboto", "Helvetica", "Arial", sans-serif`,
                                  fontWeight: 500,
                                  lineHeight: 1.5,
                                  letterSpacing: "0.00938em",
                                }}
                              >
                                {user.name}
                              </span>
                            </div>
                          </ListItem>
                        </NavLink>
                      </div>
                    </Tooltip>
                  ))}
              </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <List
                component="nav"
                style={{
                  maxHeight: 400,
                  overflow: "auto",
                  width: 350,
                  borderRadius: 15,
                }}
                aria-label="main mailbox folders"
              >
                {comments && comments.length === 0 && (
                  <div style={{ textAlign: "center" }}>Be First Comment</div>
                )}
                {comments &&
                  comments.map((comment) => (
                    <Tooltip
                      key={comment._id}
                      _id={comment._id}
                      name={comment.user.name}
                      avatar={comment.user.avatar}
                      pending={comment.user.pending}
                      placement="top"
                    >
                      <div>
                        <NavLink
                          to={`/profile/${comment.user._id}`}
                          style={{
                            textDecoration: "none",
                            color: "#1d3a5f",
                            fontWeight: 500,
                          }}
                        >
                          <ListItem className={classes.user} button>
                            <ListItemIcon>
                              <Avatar
                                src={comment.user.avatar}
                                style={{ borderRadius: "25%" }}
                              />
                            </ListItemIcon>
                            <div
                              style={{
                                flex: "1 1 auto",
                                minWidth: 0,
                                marginTop: 4,
                                marginBottom: 4,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "1rem",
                                  fontFamily: ` "Roboto", "Helvetica", "Arial", sans-serif`,
                                  fontWeight: 500,
                                  lineHeight: 1.5,
                                  letterSpacing: "0.00938em",
                                }}
                              >
                                {comment.user.name}
                              </span>
                            </div>
                          </ListItem>
                        </NavLink>
                      </div>
                    </Tooltip>
                  ))}
              </List>
            </TabPanel>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

Post.propTypes = {
  loading: PropTypes.bool,
};
