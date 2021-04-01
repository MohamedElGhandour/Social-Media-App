import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Facebook from "../Posts/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
      <Grid container spacing={3}>
        <Grid item xs={2} className={classes.sectionDesktop}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          xs={12}
          md={8}
        >
          <Facebook />
        </Grid>
        <Grid item xs={2} className={classes.sectionDesktop}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
