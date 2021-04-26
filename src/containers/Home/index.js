import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Posts from "../Posts/index";
import Lists from "../Lists/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
  },
  [theme.breakpoints.up("md")]: {
    root: {
      top: 56,
    },
  },
  [theme.breakpoints.up("xs")]: {
    root: {
      top: 48,
    },
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

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={2} className={classes.sectionDesktop}>
          <Lists />
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: "0 16px" }}>
          <Posts />
        </Grid>
        <Grid item xs={2} className={classes.sectionDesktop}>
          <Lists />
        </Grid>
      </Grid>
    </div>
  );
}
