import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Tooltip from "../Tooltip/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 10,
  },
  comment: {
    backgroundColor: "#f0f2f5",
    borderRadius: "18px",
    padding: 10,
  },
}));

export default function Comment(props) {
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2} sm={1}>
          <Tooltip
            id={props.userId}
            name={props.author}
            avatar={props.avatar}
            placement="top"
          >
            <NavLink to={`/profile/${props.userId}`}>
              <Avatar src={props.avatar} style={{ borderRadius: "25%" }} />
            </NavLink>
          </Tooltip>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.comment}
          >
            <Tooltip
              id={props.userId}
              name={props.author}
              avatar={props.avatar}
              placement="top"
            >
              <NavLink
                style={{
                  textDecoration: "none",
                }}
                to={`/profile/${props.userId}`}
              >
                <Typography
                  variant="body1"
                  style={{
                    color: "rgb(29, 58, 95)",
                    fontWeight: "bold",
                    fontSize: ".75rem",
                  }}
                  component="p"
                >
                  {props.author}
                </Typography>
              </NavLink>
            </Tooltip>
            <Typography
              variant="body1"
              style={{ color: "#505050", fontSize: ".875rem" }}
              component="p"
            >
              {props.body}
            </Typography>
          </Grid>
          <Typography
            variant="body1"
            style={{ color: "#000", fontSize: ".875rem" }}
            component="p"
          ></Typography>
        </Grid>
      </Grid>
    </div>
  );
}
