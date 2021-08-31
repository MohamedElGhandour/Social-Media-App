import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PauseIcon from "@material-ui/icons/Pause";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonAddDisabledOutlinedIcon from "@material-ui/icons/PersonAddDisabledOutlined";
import { follow, cancel, unfollow } from "../../../store/actions/index";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";

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
  btnUser: {
    width: "100%",
    background: "#eee",
    color: "#000",
    borderRadius: 10,
  },
}));

export default function FollowBtn(props) {
  const classes = useStyles();
  const [btnName, setBtnName] = React.useState("Request");
  const { user, userfollow } = props;
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const followFun = (id) => dispatch(follow(id));
  const cancelTheRequest = (id) => dispatch(cancel(id));
  const unFollowFun = (id) => dispatch(unfollow(id));
  return user._id === userId ? null : (
    <Grid item>
      <Grid spacing={2} container>
        <Grid xs item>
          <Button
            className={classes.btnUser}
            onClick={() =>
              user.pending.includes(userId)
                ? cancelTheRequest(user._id)
                : userfollow.following.includes(user._id)
                ? unFollowFun(user._id)
                : followFun(user._id)
            }
            color="inherit"
            onMouseEnter={
              user.pending.includes(userId) ? () => setBtnName("Cancel") : null
            }
            onMouseLeave={
              user.pending.includes(userId) ? () => setBtnName("Request") : null
            }
          >
            {user.pending.includes(userId) ? (
              <React.Fragment>
                <PauseIcon />
                <span style={{ paddingLeft: 5 }}>{btnName}</span>
              </React.Fragment>
            ) : userfollow.following.includes(user._id) ? (
              <React.Fragment>
                <PersonAddDisabledOutlinedIcon />
                <span style={{ paddingLeft: 5 }}>UNFollow</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <PersonAddOutlinedIcon />
                <span style={{ paddingLeft: 5 }}>Follow</span>
              </React.Fragment>
            )}
          </Button>
        </Grid>
        <Grid xs item>
          <Button className={classes.btnUser} color="inherit">
            <ForumOutlinedIcon />
            <span style={{ paddingLeft: 5 }}>chat</span>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
