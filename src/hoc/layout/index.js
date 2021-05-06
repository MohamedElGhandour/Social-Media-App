import React from "react";
import Toolbar from "../../components/Navigation/Toolbar/index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Main from "../../components/Main/index";
import SideBar from "../../components/SideBar/index";
import { useLocation } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      top: 55,
    },
    top: 50,
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
  sideNav: {
    position: "fixed",
    [theme.breakpoints.up("xl")]: {
      width: 350,
    },
    [theme.breakpoints.up("lg")]: {
      width: 330,
    },
    width: 250,
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const match = pathname.match(/profile/);
  const type = match?.[0];
  const toggleDrawer = () => setOpen((prevState) => !prevState);
  const SideNav = (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Grid item xs={12}>
        <Main />
      </Grid>
      <Grid item xs={12}>
        <SideBar />
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
        >
          {!type ? (
            <Grid item xs={3} className={classes.sectionDesktop}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                style={{ width: "100%" }}
              >
                <Grid item className={classes.sideNav}>
                  {SideNav}
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid
            style={{
              position: "relative",
            }}
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
