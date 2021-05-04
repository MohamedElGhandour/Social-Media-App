import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "../../containers/Tooltip/index";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { toggleFollow } from "../../store/actions/index";

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
}));

export default function Home() {
  const classes = useStyles();
  const userId = parseInt(localStorage.getItem("userId"));
  const users = useSelector((state) => state.posts.users);
  const [user] = users.filter((user) => user.id === userId);
  const dispatch = useDispatch();
  const follow = (id, isAccepted) => {
    dispatch(toggleFollow(id, userId, isAccepted));
  };
  const pendding = [];
  user !== undefined &&
    user.pending.forEach((id) => {
      for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.id === id) pendding.push(element);
      }
    });
  const length = pendding.length;
  const lengthUsers = users.length;

  return (
    <div
      style={{ maxWidth: 680, width: "100%", margin: "auto", marginTop: 32 }}
    >
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={12} style={{ padding: "0 16px" }}>
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
                  borderRadius: 9,
                  paddingTop: 4,
                }}
              >
                {length}
              </p>
            </Grid>
          </Grid>
          {pendding &&
            pendding.map((user) => (
              <Grid
                container
                key={user.id}
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
                        id={user.id}
                        name={user.name}
                        avatar={user.avatar}
                        placement="top"
                      >
                        <NavLink
                          to={`/profile/${user.id}`}
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
                        id={user.id}
                        name={user.name}
                        avatar={user.avatar}
                        placement="top"
                      >
                        <NavLink
                          to={`/profile/${user.id}`}
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
                        wants too follow you
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
                  borderRadius: 9,
                  paddingTop: 4,
                }}
              >
                {lengthUsers}
              </p>
            </Grid>
          </Grid>
          {users.map((user) => (
            <Grid
              container
              key={user.id}
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
                      id={user.id}
                      name={user.name}
                      avatar={user.avatar}
                      placement="top"
                    >
                      <NavLink
                        to={`/profile/${user.id}`}
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
                      id={user.id}
                      name={user.name}
                      avatar={user.avatar}
                      placement="top"
                    >
                      <NavLink
                        to={`/profile/${user.id}`}
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
                      to={`/profile/${user.id}`}
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
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
