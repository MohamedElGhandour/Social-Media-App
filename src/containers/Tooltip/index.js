import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonAddDisabledOutlinedIcon from "@material-ui/icons/PersonAddDisabledOutlined";
import PauseIcon from "@material-ui/icons/Pause";
import { useDispatch } from "react-redux";
import { follow, cancel, unfollow } from "../../store/actions/index";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "0px 0px 5px 5px rgb(0 0 0 / 7%)",
    maxWidth: 300,
    minWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: 15,
    padding: "10px",
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  tooltip: {
    Width: 300,
  },
  btnUser: {
    width: "100%",
    background: "#eee",
    color: "#000",
    borderRadius: 10,
  },
}));

export default function ToolTip(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [btnName, setBtnName] = React.useState("Request");
  const { name, _id, avatar, children, placement, pending } = props;
  const userfollow = useSelector((state) => state.auth);
  const followFun = (id) => dispatch(follow(id));
  const cancelTheRequest = (id) => dispatch(cancel(id));
  const unFollowFun = (id) => dispatch(unfollow(id));
  return (
    <HtmlTooltip
      interactive
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 200 }}
      placement={placement}
      title={
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
          className={classes.tooltip}
        >
          <Grid item>
            <NavLink
              to={`/profile/${_id}`}
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
                  width: "80px",
                  height: "80px",
                }}
              />
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink
              to={`/profile/${_id}`}
              style={{
                textDecoration: "none",
                color: "#1d3a5f",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  fontFamily: ` "Roboto", "Helvetica", "Arial", sans-serif`,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: "0.00938em",
                }}
              >
                {name}
              </span>
            </NavLink>
            <NavLink
              to={`/profile/${_id}`}
              style={{
                textDecoration: "none",
                color: "#1d3a5f",
                fontWeight: 500,
              }}
            >
              <div
                style={{
                  fontFamily: ` "Roboto", "Helvetica", "Arial", sans-serif`,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontSize: ".8rem",
                  letterSpacing: "0.00938em",
                  color: "#505050",
                }}
              >
                @{name}
              </div>
            </NavLink>
          </Grid>
          {_id === userId ? null : (
            <Grid item xs={12}>
              <Grid spacing={2} container>
                <Grid xs item>
                  <Button
                    className={classes.btnUser}
                    onClick={() =>
                      pending && pending.includes(userId)
                        ? cancelTheRequest(_id)
                        : userfollow.following.includes(_id)
                        ? unFollowFun(_id)
                        : followFun(_id)
                    }
                    color="inherit"
                    onMouseEnter={
                      pending && pending.includes(userId)
                        ? () => setBtnName("Cancel")
                        : null
                    }
                    onMouseLeave={
                      pending && pending.includes(userId)
                        ? () => setBtnName("Request")
                        : null
                    }
                  >
                    {pending && pending.includes(userId) ? (
                      <React.Fragment>
                        <PauseIcon />
                        <span style={{ paddingLeft: 5 }}>{btnName}</span>
                      </React.Fragment>
                    ) : userfollow.following.includes(_id) ? (
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
          )}
        </Grid>
      }
    >
      {children}
    </HtmlTooltip>
  );
}
