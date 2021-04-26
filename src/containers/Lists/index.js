import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "../../components/UI/Avatar/index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    marginTop: 32,
    backgroundColor: "transparent",
  },
  user: {
    borderRadius: 10,
  },
  head: {
    color: "#65676b",
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.1765,
    wordBreak: "break-word",
    margin: "5px 0",
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
        }}
        aria-label="main mailbox folders"
      >
        {users.map((user) => (
          <NavLink
            key={user.id}
            to={`/profile/${user.id}`}
            style={{
              textDecoration: "none",
              color: "#050505",
            }}
          >
            <ListItem className={classes.user} button>
              <ListItemIcon>
                <Avatar avatar={user.avatar} />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
}
