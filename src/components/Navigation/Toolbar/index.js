import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/l-icon.svg";

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
      minHeight: 48,
      padding: "0 20px 0 16px",
    },
  },
  [theme.breakpoints.up("sm")]: {
    navBar: {
      minHeight: 52,
      padding: "0 20px 0 16px",
    },
  },
  [theme.breakpoints.up("md")]: {
    navBar: {
      minHeight: 56,
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
    marginLeft: 10,
    "&:hover": {
      backgroundColor: "#d8d8d8",
    },
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

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

  const avatar = localStorage.getItem("avatar");
  const name = localStorage.getItem("name");

  const menuId = "primary-search-account-menu";

  const menuNav = (
    <React.Fragment>
      <IconButton
        aria-label="show 4 new mails"
        className={classes.iconNav}
        style={{ color: "#050505" }}
        color="inherit"
      >
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton
        className={classes.iconNav}
        style={{ color: "#050505" }}
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={1} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        className={classes.iconNav}
        style={{ color: "#050505" }}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <ArrowDropDownIcon />
      </IconButton>
    </React.Fragment>
  );

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
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
      <HideOnScroll {...props}>
        <AppBar position="fixed" color="inherit">
          {/* Nav Bar */}
          <Toolbar className={classes.navBar}>
            {/* Slide Toggle Btn  */}
            <IconButton
              edge="start"
              className={(classes.menuButton, classes.sectionMobile)}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            {/* logo */}
            <IconButton
              style={{
                width: 40,
                height: 40,
                marginLeft: 10,
              }}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Avatar src={logo} />
            </IconButton>
            <IconButton
              className={classes.iconNav}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div> */}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <div
                style={{
                  flex: "0 0 auto",
                  color: "rgba(0, 0, 0, 0.54)",
                  overflow: "visible",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Chip
                  avatar={
                    <Avatar
                      src={avatar}
                      style={{ width: 30, height: 30, marginLeft: "2.5px" }}
                    />
                  }
                  className={classes.chip}
                  label={name}
                  clickable
                />
              </div>
              {menuNav}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                className={classes.iconNav}
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Avatar src={avatar} />
              </IconButton>
              {menuNav}
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMenu}
    </div>
  );
}
