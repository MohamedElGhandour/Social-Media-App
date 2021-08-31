import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    marginTop: 32,
    backgroundColor: "#fff",
    borderRadius: 15,
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
    margin: "16px auto",
    padding: "10px ",
    boxSizing: "border-box",
  },
  user: {
    borderRadius: 10,
  },
}));

export default function SimpleList() {
  const classes = useStyles();
  const name = localStorage.getItem("name");
  const avatar = localStorage.getItem("avatar");
  const id = localStorage.getItem("userId");

  return (
    <div
      style={{
        margin: "0 10px",
      }}
    >
      <div className={classes.root}>
        <NavLink
          to={`/profile/${id}`}
          style={{
            textDecoration: "none",
            color: "#1d3a5f",
            fontWeight: 500,
          }}
        >
          <ListItem className={classes.user} button>
            <ListItemIcon>
              <Avatar src={avatar} style={{ borderRadius: "25%" }} />
            </ListItemIcon>
            <div style={{ cursor: "pointer" }}>
              <span
                style={{
                  fontSize: "1rem",
                  fontFamily: ` "Roboto", "Helvetica", "Arial", sans-serif`,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: "0.00938em",
                }}
              >
                {name}
              </span>
              <div
                style={{
                  fontFamily: ` "Roboto", "Helvetica", "Arial", sans-serif`,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontSize: ".8rem",
                  letterSpacing: "0.00938em",
                  color: "#505050",
                }}
              >
                @{name}
              </div>
            </div>
          </ListItem>
        </NavLink>
      </div>
    </div>
  );
}
