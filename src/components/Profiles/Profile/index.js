import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import cover from "../../../assets/images/cover.jpg";
import Avatar from "@material-ui/core/Avatar";

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
      maxWidth: 975,
    },
    paddingTop: 43,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
    margin: "auto",
    borderRadius: "0 0 15px 15px",
    width: "auto",
    maxWidth: 975,
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
}));

const Profile = (props) => {
  const classes = useStyles();
  const { name, avatar, id, email } = props;
  const userId = localStorage.getItem("userId");
  const me = userId === id;
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Avatar src={avatar} className={classes.avatar} />
      </div>
      <div style={{ paddingRight: 15, paddingLeft: 15 }}>
        <div className={classes.info}>
          <h1 className={classes.name}>{name}</h1>
          <p className={classes.para}>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
