import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import cover from "../../../assets/images/cover.jpg";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonAddDisabledOutlinedIcon from "@material-ui/icons/PersonAddDisabledOutlined";
import PauseIcon from "@material-ui/icons/Pause";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleRequest, toggleFollow } from "../../../store/actions/index";

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
  root: {
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    height: 350,
    backgroundImage: `url(${cover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "0 0 15px 15px",
  },
  avatar: {
    width: 168,
    height: 168,
    borderRadius: "20%",
    margin: "auto",
    position: "relative",
    top: 224,
  },
  info: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 680,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 1045,
    },
    paddingTop: 43,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
    margin: "auto",
    borderRadius: "0 0 15px 15px",
    width: "auto",
    maxWidth: 1045,
  },
  name: {
    textAlign: "center",
    fontWeight: 500,
    padding: "16px 0",
    margin: "auto",
  },
  para: {
    textAlign: "center",
    padding: "0 0 20px 0",
    margin: "auto",
  },
  btnUser: {
    width: "100%",
    background: "#eee",
    color: "#000",
    borderRadius: 8,
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = parseInt(localStorage.getItem("userId"));
  const users = useSelector((state) => state.posts.users);
  const [user] = users.filter((user) => user.id === userId);
  const { name, avatar, id, email, following, pending } = props;
  const [btnName, setBtnName] = React.useState("Request");
  const me = userId === id;
  const request = (id) => {
    dispatch(toggleRequest(userId, id));
  };
  const follow = (id, isAccepted) => {
    dispatch(toggleFollow(id, userId, isAccepted));
  };
  const penddingReq = user.pending.includes(id);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Avatar src={avatar} className={classes.avatar} />
      </div>
      <div style={{ paddingRight: 15, paddingLeft: 15 }}>
        <div className={classes.info}>
          <h1 className={classes.name}>{name}</h1>
          <p className={classes.para}>{email}</p>
          {!me && (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ padding: 10 }}
              spacing={2}
            >
              <Grid item xs={6}>
                <Grid spacing={2} container>
                  <Grid xs item>
                    <Button
                      className={classes.btnUser}
                      onClick={() => request(id)}
                      color="inherit"
                    >
                      {pending.includes(userId) ? (
                        <React.Fragment>
                          <PauseIcon />
                          <span
                            onMouseEnter={() => setBtnName("Cancel")}
                            onMouseLeave={() => setBtnName("Request")}
                            style={{ paddingLeft: 5 }}
                          >
                            {btnName}
                          </span>
                        </React.Fragment>
                      ) : following.includes(id) ? (
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
              {penddingReq && (
                <Grid item xs={6}>
                  <Grid spacing={2} container>
                    <Grid xs item>
                      <Button
                        className={classes.btnUser}
                        style={{
                          backgroundColor: "#216FDB",
                          color: "#fff",
                        }}
                        onClick={() => follow(user.id, true)}
                        color="inherit"
                      >
                        Accept
                      </Button>
                    </Grid>
                    <Grid xs item>
                      <Button
                        className={classes.btnUser}
                        onClick={() => follow(user.id, false)}
                        color="inherit"
                      >
                        Decline
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
