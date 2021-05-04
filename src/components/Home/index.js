import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Posts from "../../containers/Posts/index";
import Lists from "../Lists/index";
import Requests from "../../containers/Requests/index";

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
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid item xs={12} md={8} style={{ padding: "0 16px" }}>
        <Posts />
      </Grid>
      <Grid item xs={4} className={classes.sectionDesktop}>
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
