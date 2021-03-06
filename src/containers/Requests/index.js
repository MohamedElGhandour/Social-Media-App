import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "../Tooltip/index";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { accept, decline } from "../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    maxWidth: 360,
    margin: "16px auto",
    backgroundColor: "transparent",
  },
  user: {
    borderRadius: 10,
  },
  head: {
    color: "#a1aebe",
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.1765,
    wordBreak: "break-word",
    margin: "0",
    padding: "0 0 0 16px",
  },
  btnUser: {
    width: "100%",
    background: "#eee",
    color: "#000",
    borderRadius: 10,
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
}));

export default function SimpleList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const acceptFun = (id) => dispatch(accept(id));
  const declineFun = (id) => dispatch(decline(id));
  const pending = useSelector((state) => state.auth.pending);
  const length = pending ? pending.length : 0;
  if (pending) {
    if (pending.length > 2) {
      while (pending.length > 2) {
        pending.pop();
      }
    }
  }
  return pending && pending.length > 0 ? (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <p className={classes.head}>Requests</p>
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
      {pending &&
        pending.map((user) => (
          <Grid
            container
            key={user._id}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
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
              <Tooltip
                _id={user._id}
                name={user.name}
                avatar={user.avatar}
                pending={user.pending}
                placement="left-start"
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
                placement="left-start"
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
            <Grid item xs={12}>
              <Grid spacing={2} container>
                <Grid xs item>
                  <Button
                    className={(classes.btnUser, classes.reqBtn)}
                    onClick={() => acceptFun(user._id)}
                    color="inherit"
                  >
                    Accept
                  </Button>
                </Grid>
                <Grid xs item>
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
          </Grid>
        ))}
    </div>
  ) : null;
}
