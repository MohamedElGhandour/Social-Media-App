import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
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
} from "@material-ui/core/";
import {
  MoreHoriz,
  FavoriteBorderOutlined,
  Favorite,
  ChatBubbleOutlineOutlined,
} from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import CommentGenerator from "../../containers/Comments/Generator/index";
import Comment from "../../containers/Comments/index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Tooltip from "../../containers/Tooltip/index";
import CircularProgress from "@material-ui/core/CircularProgress";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#f33e58",
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
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    boxShadow: theme.shadows[5],
    borderRadius: 15,
  },
  reaction: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  user: {
    borderRadius: 10,
  },
}));

export default function Post(props) {
  const { loading = false } = props;
  // const preventDefault = (event) => event.preventDefault();
  const [comment, setComment] = React.useState(false);
  const [love, setLove] = React.useState(false);
  const userId = parseInt(localStorage.getItem("userId"));
  const { loves, global, comments } = props;
  const post = () => {
    const _Post = cloneDeep(global);
    delete _Post.author;
    delete _Post.avatar;
    delete _Post.comments;
    love
      ? (_Post.loves = _Post.loves.filter((id) => id !== userId))
      : _Post.loves.push(userId);
    props.toggleLove(_Post);
  };
  React.useEffect(() => {
    loves !== undefined &&
      loves.forEach((id) => (id === userId ? setLove(true) : setLove(false)));
    loves !== undefined && loves.length === 0 && setLove(false);
  }, [loves, userId]);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const openLove = () => {
    handleOpen();
    handleChange(null, 0);
  };
  const openComment = () => {
    handleOpen();
    handleChange(null, 1);
  };

  const users = useSelector((state) => state.posts.users);
  const usersComment = [];
  !loading &&
    comments.forEach((comment) => {
      for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.id === comment.userId) {
          usersComment.push(element);
        }
      }
    });
  const usersLove = [];
  !loading &&
    loves.forEach((love) => {
      for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.id === love) {
          usersLove.push(element);
        }
      }
    });
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
                id={props.userId}
                name={props.name}
                avatar={props.avatar}
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
              <IconButton style={{ borderRadius: "25%" }} aria-label="settings">
                <MoreHoriz />
              </IconButton>
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
                  id={props.userId}
                  name={props.name}
                  avatar={props.avatar}
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
              new Date(props.timestamp).toUTCString()
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
                    color: "#f33e58",
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
                style={{ color: "#f33e58" }}
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
            <CommentGenerator
              global={props.global}
              comments={comments}
              avatar={props.avatar}
              author={props.name}
            />
            {comments.map((comment) => (
              <Comment
                avatar={comment.avatar}
                body={comment.body}
                key={comment.id}
                author={comment.author}
                userId={comment.userId}
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
                    style={{ width: "50%", color: "#4c4c4c" }}
                    icon={<ChatBubbleOutlineOutlined />}
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
                {usersLove.length === 0 && (
                  <div style={{ textAlign: "center" }}>Be First Love</div>
                )}
                {usersLove.map((user) => (
                  <Tooltip
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    avatar={user.avatar}
                    placement="top"
                  >
                    <div>
                      <NavLink
                        to={`/profile/${user.id}`}
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
                {usersComment.length === 0 && (
                  <div style={{ textAlign: "center" }}>Be First Comment</div>
                )}
                {usersComment.map((user) => (
                  <Tooltip
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    avatar={user.avatar}
                    placement="top"
                  >
                    <div>
                      <NavLink
                        to={`/profile/${user.id}`}
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
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

Post.propTypes = {
  loading: PropTypes.bool,
};
