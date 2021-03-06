import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "../../containers/Tooltip/index";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { accept, decline, fetchUsers } from "../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import FollowBtn from "./FollowBtn/index";

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
  btnUser: {
    width: "100%",
    background: "#eee",
    color: "#000",
    borderRadius: 10,
  },
}));

export default function Home() {
  const classes = useStyles();
  const userId = localStorage.getItem("userId");
  const users = useSelector((state) => state.posts.users);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const acceptFun = (id) => dispatch(accept(id));
  const declineFun = (id) => dispatch(decline(id));
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const pending = user && user.pending;
  const length = pending ? pending.length : 0;
  const lengthUsers = users.length - 1;
  const userfollow = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.ui.loading.fetchUsers);
  return (
    <div
      style={{ maxWidth: 680, width: "100%", margin: "auto", marginTop: 32 }}
    >
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={12} style={{ padding: "0 16px" }}>
          {loading ? (
            <CircularProgress
              style={{
                color: "#1878f2",
                margin: "auto",
                display: "block",
                marginTop: 100,
              }}
            />
          ) : (
            <React.Fragment>
              {length > 0 ? (
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <p
                      style={{
                        color: "#a1aebe",
                        fontWeight: 600,
                        fontSize: "1rem",
                        lineHeight: 1.1765,
                        wordBreak: "break-word",
                        margin: "0",
                        padding: "0 0 0 16px",
                      }}
                    >
                      Requests
                    </p>
                  </Grid>
                  <Grid item>
                    <p
                      style={{
                        fontWeight: 500,
                        padding: "3px 7px",
                        backgroundColor: "#216fdb",
                        fontSize: ".9rem",
                        color: "#fff",
                        margin: "0 10px 0 0",
                        paddingTop: 4,
                        borderRadius: "25%",
                      }}
                    >
                      {length}
                    </p>
                  </Grid>
                </Grid>
              ) : null}
              {pending &&
                pending.map((user) => (
                  <Grid
                    container
                    key={user._id}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                    style={{
                      overflow: "auto",
                      width: "auto",
                      backgroundColor: "#fff",
                      borderRadius: 15,
                      boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
                      margin: "10px",
                      padding: "10px 10px ",
                    }}
                  >
                    <Grid item>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Tooltip
                            _id={user._id}
                            name={user.name}
                            avatar={user.avatar}
                            pending={user.pending}
                            placement="top"
                          >
                            <NavLink
                              to={`/profile/${user._id}`}
                              style={{
                                textDecoration: "none",
                                color: "#1d3a5f",
                                fontWeight: 500,
                              }}
                            >
                              <Avatar
                                src={user.avatar}
                                style={{
                                  borderRadius: "25%",
                                  width: 60,
                                  height: 60,
                                }}
                              />
                            </NavLink>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip
                            _id={user._id}
                            name={user.name}
                            avatar={user.avatar}
                            pending={user.pending}
                            placement="top"
                          >
                            <NavLink
                              to={`/profile/${user._id}`}
                              style={{
                                textDecoration: "none",
                                color: "#1d3a5f",
                                fontWeight: 500,
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
                            </NavLink>
                          </Tooltip>
                          <div
                            style={{
                              fontFamily: ` "Roboto", "Helvetica", "Arial", sans-serif`,
                              fontWeight: 400,
                              lineHeight: 1.5,
                              fontSize: ".9rem",
                              letterSpacing: "0.00938em",
                              color: "#1d3a5f",
                            }}
                          >
                            wants to follow you
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid spacing={2} container>
                        <Grid xs item>
                          <Button
                            className={classes.btnUser}
                            style={{
                              backgroundColor: "#216FDB",
                              color: "#fff",
                            }}
                            onClick={() => acceptFun(user._id)}
                            color="inherit"
                          >
                            Accept
                          </Button>
                        </Grid>
                        <Grid xs item>
                          <Button
                            className={classes.btnUser}
                            style={{
                              backgroundColor: "#eee",
                            }}
                            onClick={() => declineFun(user._id)}
                            color="inherit"
                          >
                            Decline
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
              >
                <Grid item>
                  <p
                    style={{
                      color: "#a1aebe",
                      fontWeight: 600,
                      fontSize: "1rem",
                      lineHeight: 1.1765,
                      wordBreak: "break-word",
                      margin: "0",
                      padding: "0 0 0 16px",
                    }}
                  >
                    People
                  </p>
                </Grid>
                <Grid item>
                  <p
                    style={{
                      fontWeight: 500,
                      padding: "3px 7px",
                      backgroundColor: "#abb9c9",
                      fontSize: ".9rem",
                      color: "#fff",
                      margin: "0 10px 0 0",
                      paddingTop: 4,
                      borderRadius: "25%",
                    }}
                  >
                    {lengthUsers}
                  </p>
                </Grid>
              </Grid>
              {users.map((user) =>
                user._id === userId ? null : (
                  <Grid
                    container
                    key={user._id}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                    style={{
                      overflow: "auto",
                      width: "auto",
                      backgroundColor: "#fff",
                      borderRadius: 15,
                      boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
                      margin: "10px",
                      padding: "10px 10px ",
                    }}
                  >
                    <Grid item>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Tooltip
                            _id={user._id}
                            name={user.name}
                            avatar={user.avatar}
                            pending={user.pending}
                            placement="top"
                          >
                            <NavLink
                              to={`/profile/${user._id}`}
                              style={{
                                textDecoration: "none",
                                color: "#1d3a5f",
                                fontWeight: 500,
                              }}
                            >
                              <Avatar
                                src={user.avatar}
                                style={{
                                  borderRadius: "25%",
                                  width: 60,
                                  height: 60,
                                }}
                              />
                            </NavLink>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip
                            _id={user._id}
                            name={user.name}
                            avatar={user.avatar}
                            pending={user.pending}
                            placement="top"
                          >
                            <NavLink
                              to={`/profile/${user._id}`}
                              style={{
                                textDecoration: "none",
                                color: "#1d3a5f",
                                fontWeight: 500,
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
                            </NavLink>
                          </Tooltip>
                          <NavLink
                            to={`/profile/${user._id}`}
                            style={{
                              textDecoration: "none",
                              color: "#1d3a5f",
                              fontWeight: 500,
                            }}
                          >
                            <div
                              style={{
                                fontFamily: ` "Roboto", "Helvetica", "Arial", sans-serif`,
                                fontWeight: 400,
                                lineHeight: 1.5,
                                fontSize: ".9rem",
                                letterSpacing: "0.00938em",
                                color: "#1d3a5f",
                              }}
                            >
                              @{user.name}
                            </div>
                          </NavLink>
                        </Grid>
                      </Grid>
                    </Grid>
                    <FollowBtn user={user} userfollow={userfollow} />
                  </Grid>
                )
              )}
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
