import React, { useEffect, useRef } from "react";
import Toolbar from "../components/Navigation/Toolbar/index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Main from "../components/Main/index";
import SideBar from "../components/SideBar/index";
import { useLocation } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { currentUser } from "../store/actions/index";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
  paperAnchorLeft: {
    width: 300,
  },
  underRoot: {
    overflow: "auto",
    height: "100vh",
  },
  content: {
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      top: 55,
    },
    top: 50,
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const match = pathname.match(/profile/);
  const type = match?.[0];
  const toggleDrawer = () => setOpen((prevState) => !prevState);
  const body = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
    body.current.scrollTop = 0;
  });

  const SideNav = (
    <Grid container justify="flex-start" alignItems="stretch">
      <Grid item xs={12}>
        <Main />
      </Grid>
      <Grid item xs={12}>
        <SideBar closeDrawer={() => setOpen(false)} />
      </Grid>
    </Grid>
  );
  return (
    <React.Fragment>
      <Toolbar toggleDrawer={toggleDrawer} />
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.underRoot}
          id="underRoot"
          ref={body}
        >
          {!type ? (
            <Grid
              item
              xs={3}
              className={classes.sectionDesktop}
              style={{
                position: "sticky",
                top: 0,
              }}
            >
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                style={{ width: "100%" }}
              >
                <Grid item className={classes.content}>
                  {SideNav}
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid
            style={{
              position: "relative",
            }}
            className={classes.content}
            item
            xs={12}
            md={!type ? 9 : 12}
          >
            {props.children}
          </Grid>
        </Grid>
      </div>
      <Drawer
        open={open}
        classes={{ paperAnchorLeft: classes.paperAnchorLeft }}
        onClose={toggleDrawer}
      >
        {SideNav}
      </Drawer>
    </React.Fragment>
  );
}
