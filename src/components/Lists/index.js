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
    margin: "auto",
    marginTop: 16,
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

export default function SimpleList() {
  const classes = useStyles();
  const users = useSelector((state) => state.posts.users);
  const length = users.length;
  return (
    <div className={classes.root}>
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
              borderRadius: 9,
              paddingTop: 4,
            }}
          >
            {length}
          </p>
        </Grid>
      </Grid>
      <List
        component="nav"
        style={{
          maxHeight: 400,
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
        {users.map((user) => (
          <Tooltip
            key={user.id}
            id={user.id}
            name={user.name}
            avatar={user.avatar}
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
        ))}
      </List>
    </div>
  );
}
