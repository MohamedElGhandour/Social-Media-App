import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Posts from "../../containers/Posts/index";
import Lists from "../../components/Lists/index";
import Requests from "../../containers/Requests/index";
import Profile from "./Profile/index";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  fetchUsers,
  restScrollPage,
} from "../../store/actions/index";
import NotFound from "../../components/NotFound/index";

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
  postContainer: {
    [theme.breakpoints.up("sm")]: {
      minWidth: 680,
    },
    minWidth: "auto",
  },
}));

export default function Home() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const profile = useSelector((state) => state.posts.profile);
  const notFoundUser = useSelector((state) => state.posts.notFoundUser);
  const currentUser = userId === id;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(restScrollPage());
    dispatch(fetchUsers());
    dispatch(fetchUser(id, "profile"));
  }, [dispatch, id]);
  const classes = useStyles();
  // console.log(profile);
  return notFoundUser ? (
    <NotFound />
  ) : (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid item xs={12}>
        {profile && <Profile user={profile} />}
      </Grid>
      <Grid item style={{ padding: "0 16px", marginTop: 16 }}>
        <div className={classes.postContainer}>
          {profile && <Posts profile={currentUser} profileId={profile._id} />}
        </div>
      </Grid>
      {profile && (
        <Grid
          item
          style={{ marginTop: 16, position: "sticky", top: 71 }}
          className={classes.sectionDesktop}
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Requests />
            </Grid>
            <Grid item>
              <Lists profile />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
