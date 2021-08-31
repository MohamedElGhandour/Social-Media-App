import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import notFound404Img from "../../assets/images/404.svg";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  main: { textAlign: "center" },
  notFound404Img: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    width: "auto",
  },
  para: {
    fontWeight: 400,
    textTransform: "uppercase",
    fontSize: 25,
    color: "#1a2e35",
    textShadow: "1px 1px 20px #1878f2",
  },
  btnPost: {
    backgroundColor: "#1878f2",
    color: "#fff",
    textAlign: "center",
    padding: theme.spacing(1.1),
    borderRadius: 6,
    fontWeight: 600,
    cursor: "pointer",
    width: 200,
    transition: "all .5s ease",
    "&:hover": {
      backgroundColor: "#216FDc",
    },
  },
}));

export default function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <img src={notFound404Img} alt="404" className={classes.notFound404Img} />
      <p className={classes.para}>the page you looking for not found</p>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <Button className={classes.btnPost} startIcon={<HomeIcon />}>
          Back Home
        </Button>
      </NavLink>
    </div>
  );
}
