import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vh",
    maxWidth: 360,
    margin: "auto",
    marginTop: 32,
    backgroundColor: "transparent",
    // position: "fixed",
  },
  user: {
    borderRadius: 10,
  },
  head: {
    color: "#a4afbe",
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.1765,
    wordBreak: "break-word",
    margin: "0 0 10px 0",
    padding: "0 0 0 16px",
  },
}));

export default function SimpleList() {
  const classes = useStyles();
  const users = useSelector((state) => state.posts.users);
  return (
    <div className={classes.root}>
      <p className={classes.head}>Friends Suggestion</p>
      <List
        component="nav"
        style={{
          maxHeight: 400,
          overflow: "auto",
          backgroundColor: "#fff",
          borderRadius: 15,
          boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
          margin: "0 10px",
          padding: "15px 10px ",
        }}
        aria-label="main mailbox folders"
      >
        {users.map((user) => (
          <NavLink
            key={user.id}
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
        ))}
      </List>
    </div>
  );
}
