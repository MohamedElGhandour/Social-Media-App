import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "../../containers/Tooltip/index";
import Grid from "@material-ui/core/Grid";

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
}));

export default function SimpleList(props) {
  const classes = useStyles();
  const users = useSelector((state) => state.posts.users);
  const userId = localStorage.getItem("userId");
  const { profile } = props;
  const length = users ? users.length - 1 : 0;
  return (
    <div className={classes.root} style={{ width: profile ? 360 : "auto" }}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <p className={classes.head}>Friends Suggestion</p>
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
            {length}
          </p>
        </Grid>
      </Grid>
      <List
        component="nav"
        style={{
          maxHeight: "50vh",
          overflow: "auto",
          backgroundColor: "#fff",
          borderRadius: 15,
          boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
          width: "auto",
          margin: "10px",
          padding: "15px 10px ",
          boxSizing: "border-box",
        }}
        aria-label="main mailbox folders"
      >
        {users.map((user) =>
          user._id === userId ? null : (
            <Tooltip
              key={user._id}
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
                <ListItem className={classes.user} button>
                  <ListItemIcon>
                    <Avatar src={user.avatar} style={{ borderRadius: "25%" }} />
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
            </Tooltip>
          )
        )}
      </List>
    </div>
  );
}
