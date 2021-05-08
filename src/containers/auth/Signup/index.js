import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../../../assets/images/logo.svg";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../store/actions/index";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { checkValidity } from "../../../shared/utility";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#1878f2",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        target="_blank"
        href="https://github.com/MohamedElGhandour"
      >
        Mohamed Elghandour
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1878f2",
    transition: "all .5s ease",
    "&:hover": {
      backgroundColor: "#216FDB",
    },
  },
  header: {
    fontSize: 50,
    marginTop: "12vh",
    fontWeight: 700,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 1.1,
  },
  logo: {
    height: 30,
    margin: 20,
  },
  link: {
    color: "#1d3a5f",
    fontWeight: 500,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.errorSignup);
  const [controls, setControls] = React.useState({
    name: {
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    email: {
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const changedInputHandler = (event, elementIdentifer) => {
    const updatedcontrols = cloneDeep(controls);
    updatedcontrols[elementIdentifer].value = event.target.value;
    updatedcontrols[elementIdentifer].valid = checkValidity(
      event.target.value,
      controls[elementIdentifer].validation
    );
    updatedcontrols[elementIdentifer].touched = true;
    setControls(updatedcontrols);
  };
  const authEvent = (e) => {
    e.preventDefault();
    const name = controls.name.value;
    const email = controls.email.value;
    const password = controls.password.value;
    if (email && password !== ("" || null || undefined)) {
      const authData = {
        name: name,
        email: email,
        password: password,
        isSignUp: true,
      };
      dispatch(auth(authData));
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} className={classes.logo} alt="logo"></img>
        <Typography component="h1" className={classes.header} variant="h5">
          Sign up
        </Typography>
        {error && (
          <Alert style={{ width: "100%" }} severity="error">
            {error}
          </Alert>
        )}
        <form className={classes.form} onSubmit={authEvent}>
          <ThemeProvider theme={theme}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              type="text"
              autoComplete="name"
              autoFocus
              value={controls.name.value}
              onChange={(event) => changedInputHandler(event, "name")}
              color={
                !controls.name.valid && controls.name.touched
                  ? "secondary"
                  : "primary"
              }
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={controls.email.value}
              onChange={(event) => changedInputHandler(event, "email")}
              color={
                !controls.email.valid && controls.email.touched
                  ? "secondary"
                  : "primary"
              }
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={controls.password.value}
              onChange={(event) => changedInputHandler(event, "password")}
              color={
                !controls.password.valid && controls.password.touched
                  ? "secondary"
                  : "primary"
              }
            />
          </ThemeProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/login" className={classes.link}>
                {"Already have an account? Log in"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
