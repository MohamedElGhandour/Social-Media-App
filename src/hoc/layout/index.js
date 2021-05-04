import React from "react";
import Toolbar from "../../components/Navigation/Toolbar/index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Main from "../../components/Main/index";
import SideBar from "../../components/SideBar/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    top: 65,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
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
}));

export default function Layout(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar />
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={3} className={classes.sectionDesktop}>
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
          </Grid>
          <Grid item xs={12} md={9}>
            {props.children}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
