import React from "react";
import Avatar from "../../components/UI/Avatar/index";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
  const preventDefault = (event) => event.preventDefault();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2} sm={1}>
          <Avatar avatar={props.avatar} />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.comment}
          >
            <Typography
              variant="body1"
              style={{ color: "#000", fontWeight: "bold", fontSize: ".75rem" }}
              component="p"
            >
              <Link href="#" style={{ color: "#000" }} onClick={preventDefault}>
                {props.author}
              </Link>
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#000", fontSize: ".875rem" }}
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
