import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import Tooltip from "../../containers/Tooltip/index";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: 680,
    margin: "auto",
    marginBottom: 25,
  },
  container: {
    marginBottom: -4,
    cursor: "pointer",
    position: "relative",
  },
  img: {
    width: "100%",
    borderRadius: 15,
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
  },
  info: {
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
    width: "90%",
    margin: "auto",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: "0 0 10px 10px",
    color: "rgb(29, 58, 95)",
    fontWeight: 500,
  },
  avatar: {
    borderRadius: "25%",
    position: "absolute",
    bottom: 15,
    right: 15,
    border: "2px solid #fff",
    padding: 4,
  },
  times: {
    position: "absolute",
    bottom: 15,
    left: 15,
  },
  gradiant: {
    width: "100%",
    height: "calc(100% - 4px)",
    position: "absolute",
    top: 0,
    borderRadius: 15,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0) 0%,  rgba(0,0,0,1) 100%)",
  },
  avatarimg: {
    borderRadius: "25%",
  },
}));

function Photo(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleChange = () => {
    setOpen((prev) => !prev);
  };
  const { userId, name, avatar, image, timestamp, pending } = props;
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <Fade in={open ? false : true}>
          <div className={classes.gradiant} onClick={handleChange}></div>
        </Fade>
        <div>
          <img
            className={classes.img}
            src={image}
            alt="jocker"
            onClick={handleChange}
          />
        </div>
        <Fade in={open ? false : true}>
          <NavLink
            to={`/profile/${userId}`}
            style={{
              textDecoration: "none",
              color: "#1d3a5f",
              fontWeight: 500,
            }}
          >
            <Avatar
              src={avatar}
              className={classes.avatar}
              classes={{ img: classes.avatarimg }}
            />
          </NavLink>
        </Fade>
        <Fade in={open ? false : true}>
          <NavLink
            to={`/profile/${userId}`}
            style={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: 500,
            }}
          >
            <div className={classes.times}>
              {new Date(timestamp).toUTCString()}
            </div>
          </NavLink>
        </Fade>
      </div>
      <Collapse in={open}>
        <div className={classes.info}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid>
              <Tooltip
                _id={userId}
                name={name}
                avatar={avatar}
                pending={pending}
                placement="top"
              >
                <NavLink
                  to={`/profile/${userId}`}
                  style={{
                    textDecoration: "none",
                    color: "#1d3a5f",
                    fontWeight: 500,
                  }}
                >
                  {name}
                </NavLink>
              </Tooltip>
            </Grid>
            <Grid>
              <Tooltip
                _id={userId}
                name={name}
                avatar={avatar}
                pending={pending}
                placement="top"
              >
                <NavLink
                  to={`/profile/${userId}`}
                  style={{
                    textDecoration: "none",
                    color: "#1d3a5f",
                    fontWeight: 500,
                  }}
                >
                  <Avatar
                    src={avatar}
                    style={{
                      borderRadius: "25%",
                    }}
                  />
                </NavLink>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </Collapse>
    </div>
  );
}

export default Photo;
