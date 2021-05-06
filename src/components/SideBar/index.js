import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 15,
    boxShadow: "0px 0px 20px 20px rgb(0 0 0 / 3%)",
    margin: "16px auto",
    boxSizing: "border-box",
  },
  domains: {
    "&::after": {
      width: "70%",
      margin: "auto",
      backgroundColor: "#eee",
      content: '""',
      display: "block",
      height: 1,
      transition: "all .5s ease-out",
    },
  },
  activeDomains: {
    "&::after": {
      width: "100%",
      margin: "auto",
      backgroundColor: "#eee",
      content: '""',
      display: "block",
      height: 1,
      transition: "all .5s ease-out",
    },
  },
  textRoot: {
    flex: "1 1 auto",
    minWidth: 0,
    marginTop: 4,
    marginBottom: 4,
    color: "#49607e",
  },
  spanText: {
    dispaly: "block",
    fontSize: "1rem",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: " 0.00938em",
  },
}));

export default function SelectedListItem() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const userId = parseInt(localStorage.getItem("userId"));
  const users = useSelector((state) => state.posts.users);
  const [user] = users.filter((user) => user.id === userId);
  const pendding = [];
  user !== undefined &&
    user.pending.forEach((id) => {
      for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.id === id) pendding.push(element);
      }
    });
  const length = pendding.length;
  const pathname = useLocation().pathname;
  React.useEffect(() => {
    switch (pathname) {
      case "/":
        setSelectedIndex(0);
        break;
      case "/people":
        setSelectedIndex(1);
        break;
      case "/photos":
        setSelectedIndex(2);
        break;
      case "/news":
        setSelectedIndex(3);
        break;
      case "/setting":
        setSelectedIndex(5);
        break;
      default:
        break;
    }
    if (pathname.match(/profile/)) setSelectedIndex(4);
  }, [pathname]);
  return (
    <div
      style={{
        margin: "0 10px",
      }}
    >
      <div className={classes.root}>
        <List component="nav" style={{ paddingTop: 25, paddingBottom: 25 }}>
          <NavLink
            activeClassName={classes.activeDomains}
            className={classes.domains}
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 0}
              style={
                selectedIndex === 0
                  ? {
                      backgroundColor: "#fbfbfc",
                      borderLeft: "2px solid #1878f2",
                      color: "#1878f2",
                    }
                  : {
                      color: "rgb(29, 58, 95)",
                    }
              }
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <HomeOutlinedIcon
                  style={
                    selectedIndex === 0
                      ? {
                          color: "#1878f2",
                        }
                      : {
                          color: "#abb9c9",
                        }
                  }
                />
              </ListItemIcon>
              <div className={classes.textRoot}>
                <span
                  className={classes.spanText}
                  style={
                    selectedIndex === 0
                      ? {
                          color: "#1878f2",
                        }
                      : null
                  }
                >
                  Home
                </span>
              </div>
            </ListItem>
          </NavLink>
          <NavLink
            activeClassName={classes.activeDomains}
            className={classes.domains}
            to="/people"
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 1}
              style={
                selectedIndex === 1
                  ? {
                      backgroundColor: "#fbfbfc",
                      borderLeft: "2px solid #1878f2",
                      color: "#1878f2",
                    }
                  : {
                      color: "rgb(29, 58, 95)",
                    }
              }
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <ListItemIcon>
                        <GroupAddOutlinedIcon
                          style={
                            selectedIndex === 1
                              ? {
                                  color: "#1878f2",
                                }
                              : {
                                  color: "#abb9c9",
                                }
                          }
                        />
                      </ListItemIcon>
                    </Grid>
                    <Grid item>
                      <div className={classes.textRoot}>
                        <span
                          className={classes.spanText}
                          style={
                            selectedIndex === 1
                              ? {
                                  color: "#1878f2",
                                }
                              : null
                          }
                        >
                          People
                        </span>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                {selectedIndex !== 1 && length > 0 ? (
                  <Grid item>
                    <p
                      style={{
                        fontWeight: 500,
                        padding: "3px 7px",
                        backgroundColor: "#216fdb",
                        fontSize: ".9rem",
                        color: "#fff",
                        margin: "0",
                        borderRadius: "25%",
                        paddingTop: 4,
                      }}
                    >
                      {length}
                    </p>
                  </Grid>
                ) : null}
              </Grid>
            </ListItem>
          </NavLink>
          <NavLink
            activeClassName={classes.activeDomains}
            className={classes.domains}
            to="/photos"
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 2}
              style={
                selectedIndex === 2
                  ? {
                      backgroundColor: "#fbfbfc",
                      borderLeft: "2px solid #1878f2",
                      color: "#1878f2",
                    }
                  : {
                      color: "rgb(29, 58, 95)",
                    }
              }
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <PhotoLibraryOutlinedIcon
                  style={
                    selectedIndex === 2
                      ? {
                          color: "#1878f2",
                        }
                      : {
                          color: "#abb9c9",
                        }
                  }
                />
              </ListItemIcon>
              <div className={classes.textRoot}>
                <span
                  className={classes.spanText}
                  style={
                    selectedIndex === 2
                      ? {
                          color: "#1878f2",
                        }
                      : null
                  }
                >
                  Photos
                </span>
              </div>
            </ListItem>
          </NavLink>
          <NavLink
            activeClassName={classes.activeDomains}
            className={classes.domains}
            to="/news"
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 3}
              style={
                selectedIndex === 3
                  ? {
                      backgroundColor: "#fbfbfc",
                      borderLeft: "2px solid #1878f2",
                      color: "#1878f2",
                    }
                  : {
                      color: "rgb(29, 58, 95)",
                    }
              }
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <EventNoteOutlinedIcon
                  style={
                    selectedIndex === 3
                      ? {
                          color: "#1878f2",
                        }
                      : {
                          color: "#abb9c9",
                        }
                  }
                />
              </ListItemIcon>
              <div className={classes.textRoot}>
                <span
                  className={classes.spanText}
                  style={
                    selectedIndex === 3
                      ? {
                          color: "#1878f2",
                        }
                      : null
                  }
                >
                  News Feed
                </span>
              </div>
            </ListItem>
          </NavLink>
          <NavLink
            activeClassName={classes.activeDomains}
            className={classes.domains}
            to={`/profile/${userId}`}
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 4}
              style={
                selectedIndex === 4
                  ? {
                      backgroundColor: "#fbfbfc",
                      borderLeft: "2px solid #1878f2",
                      color: "#1878f2",
                    }
                  : {
                      color: "rgb(29, 58, 95)",
                    }
              }
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <PersonOutlineOutlinedIcon
                  style={
                    selectedIndex === 4
                      ? {
                          color: "#1878f2",
                        }
                      : {
                          color: "#abb9c9",
                        }
                  }
                />
              </ListItemIcon>
              <div className={classes.textRoot}>
                <span
                  className={classes.spanText}
                  style={
                    selectedIndex === 4
                      ? {
                          color: "#1878f2",
                        }
                      : null
                  }
                >
                  Profile
                </span>
              </div>
            </ListItem>
          </NavLink>
          <NavLink
            activeClassName={classes.activeDomains}
            className={classes.domains}
            to="/setting"
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 5}
              style={
                selectedIndex === 5
                  ? {
                      backgroundColor: "#fbfbfc",
                      borderLeft: "2px solid #1878f2",
                      color: "#1878f2",
                    }
                  : {
                      color: "rgb(29, 58, 95)",
                    }
              }
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon>
                <SettingsOutlinedIcon
                  style={
                    selectedIndex === 5
                      ? {
                          color: "#1878f2",
                        }
                      : {
                          color: "#abb9c9",
                        }
                  }
                />
              </ListItemIcon>
              <div className={classes.textRoot}>
                <span
                  className={classes.spanText}
                  style={
                    selectedIndex === 5
                      ? {
                          color: "#1878f2",
                        }
                      : null
                  }
                >
                  Setting
                </span>
              </div>
            </ListItem>
          </NavLink>
        </List>
      </div>
    </div>
  );
}
