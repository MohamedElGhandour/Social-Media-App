import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Posts from "../../containers/Posts/index";
import Lists from "../Lists/index";
import Requests from "../../containers/Requests/index";
import Profile from "./Profile/index";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const { id } = useParams();
  const users = useSelector((state) => state.posts.users);
  const [user] = users.filter((user) => user.id === parseInt(id));
  const userId = parseInt(localStorage.getItem("userId"));
  const [userfollow] = users.filter((user) => user.id === userId);
  const me = userId === id;
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid item xs={12}>
        <Profile
          name={user.name}
          email={user.email}
          avatar={user.avatar}
          id={user.id}
          following={userfollow.following}
          pending={user.pending}
        />
      </Grid>
      <Grid item style={{ padding: "0 16px", marginTop: 16 }}>
        <Posts profile={me} profileId={user.id} />
      </Grid>
      <Grid item style={{ marginTop: 16 }} className={classes.sectionDesktop}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Requests />
          </Grid>
          <Grid item>
            <Lists />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
