import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "../../containers/Tooltip/index";
import { useDispatch } from "react-redux";
import { fetchUsers, searchUser } from "../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FollowBtn from "./FollowBtn/index";

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
  btnUser: {
    width: "100%",
    background: "#eee",
    color: "#000",
    borderRadius: 10,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchVal && dispatch(searchUser(searchVal));
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, searchVal]);
  const searchUsers = useSelector((state) => state.posts.search);
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const lengthUsers = searchUsers.length;
  const userfollow = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.ui.loading.fetchUsers);
  const loadingSearch = useSelector((state) => state.ui.loading.search);

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
              <Grid xs={12} style={{ padding: 10 }} item>
                <ThemeProvider theme={theme}>
                  <TextField
                    className={classes.search}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="search"
                    label="Find My Friends"
                    name="search"
                    type="search"
                    autoComplete="name"
                    autoFocus
                    value={searchVal}
                    onChange={(event) => setSearchVal(event.target.value)}
                    color="primary"
                  />
                </ThemeProvider>
              </Grid>
              {loadingSearch ? (
                <CircularProgress
                  style={{
                    color: "#1878f2",
                    margin: "auto",
                    display: "block",
                    marginTop: 100,
                  }}
                />
              ) : (
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
              )}
              {!loadingSearch &&
                searchUsers.map((user) => (
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
                ))}
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
