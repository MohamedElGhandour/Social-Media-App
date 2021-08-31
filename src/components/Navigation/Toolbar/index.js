import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  AppBar,
  Toolbar,
  Badge,
  MenuItem,
  Menu,
  Fab,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../assets/images/logoAvatar.svg";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  [theme.breakpoints.up("xs")]: {
    navBar: {
      padding: "0 20px 0 16px",
    },
  },
  [theme.breakpoints.up("sm")]: {
    navBar: {
      padding: "0 20px 0 16px",
    },
  },
  [theme.breakpoints.up("md")]: {
    navBar: {
      padding: "0 20px 0 0",
    },
  },
  chip: {
    fontWeight: "bold",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
  iconNav: {
    width: 40,
    height: 40,
    backgroundColor: "#efefef",
    borderRadius: "25%",
    color: "#111513",
    boxShadow: "none",
    marginLeft: 10,
    "&:hover": {
      backgroundColor: "#d8d8d8",
    },
  },
  anchorTopRight: {
    borderRadius: "25%",
    color: "#fff",
    backgroundColor: "rgb(33, 111, 219)",
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";
  const userId = localStorage.getItem("userId");
  const realUser = useSelector((state) => state.auth);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NavLink
        to={`/profile/${userId}`}
        style={{
          textDecoration: "none",
          color: "#1d3a5f",
          fontWeight: 500,
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </NavLink>
      <MenuItem onClick={handleMenuClose}>
        <NavLink
          to="/logout"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Log out
        </NavLink>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        // position="static"
        style={{
          boxShadow:
            "rgb(238 238 238 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px, 0px 0px 20px 20px rgb(0 0 0 / 3%)",
          backgroundColor: "#fcfcfd",
          borderRadius: "0 0 10px 10px",
        }}
        color="inherit"
      >
        {/* Nav Bar */}
        <Toolbar className={classes.navBar}>
          {/* Slide Toggle Btn  */}
          <Fab
            edge="start"
            className={(classes.menuButton, classes.sectionMobile)}
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#fff",
              borderRadius: "25%",
              color: "#111513",
              boxShadow: "none",
            }}
            onClick={props.toggleDrawer}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </Fab>
          <NavLink to="/">
            <Fab
              style={{
                width: 40,
                height: 40,
                marginLeft: 10,
                color: "rgb(24 120 242)",
              }}
              color="inherit"
            >
              <Avatar src={logo} style={{ borderRadius: "25%" }} />
            </Fab>
          </NavLink>
          <NavLink to="/search">
            <Fab className={classes.iconNav} color="inherit">
              <SearchIcon />
            </Fab>
          </NavLink>
          <div className={classes.grow} />
          <div>
            <Fab
              aria-label="show 4 new mails"
              className={classes.iconNav}
              color="inherit"
            >
              <Badge
                badgeContent={4}
                classes={{
                  anchorOriginTopRightRectangle: classes.anchorTopRight,
                }} // <== Working Code
                color="primary"
              >
                <MailOutlineIcon />
              </Badge>
            </Fab>
            <Fab
              className={classes.iconNav}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge
                badgeContent={1}
                classes={{
                  anchorOriginTopRightRectangle: classes.anchorTopRight,
                }} // <== Working Code
                color="primary"
              >
                <NotificationsNoneIcon />
              </Badge>
            </Fab>
            <Fab
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              className={classes.iconNav}
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                src={realUser && realUser.avatar}
                style={{ borderRadius: "25%" }}
              />
            </Fab>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
