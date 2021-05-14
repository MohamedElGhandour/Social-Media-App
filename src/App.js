import React, { Suspense } from "react";
import Layout from "./layout/index";
import Home from "./components/Home/index";
import Profiles from "./containers/Profiles/index";
import News from "./components/News/index";
import Login from "./containers/auth/Login/index";
import Signup from "./containers/auth/Signup/index";
import Logout from "./containers/auth/Logout/index";
import People from "./components/People/index";
import Photos from "./containers/Photos/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { authCheckState } from "./store/actions/index";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const tokenAccess = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);
  let route = (
    <Switch>
      {false && tokenAccess}
      <Route
        exact
        path="/signup"
        render={() => (
          <Suspense
            fallback={<CircularProgress style={{ color: "#1878f2" }} />}
          >
            <Signup />
          </Suspense>
        )}
      />
      <Route
        exact
        path="/login"
        render={() => (
          <Suspense
            fallback={<CircularProgress style={{ color: "#1878f2" }} />}
          >
            <Login />
          </Suspense>
        )}
      />
      {!token && <Redirect to="/login" />}
    </Switch>
  );
  token &&
    (route = (
      <Layout>
        <Switch>
          <Route
            path="/Profile/:id"
            exact
            render={() => (
              <Suspense
                fallback={<CircularProgress style={{ color: "#1878f2" }} />}
              >
                <Profiles />
              </Suspense>
            )}
          />
          <Route
            path="/logout"
            exact
            render={() => (
              <Suspense
                fallback={<CircularProgress style={{ color: "#1878f2" }} />}
              >
                <Logout />
              </Suspense>
            )}
          />
          <Route
            path="/people"
            exact
            render={() => (
              <Suspense
                fallback={<CircularProgress style={{ color: "#1878f2" }} />}
              >
                <People />
              </Suspense>
            )}
          />
          <Route
            path="/photos"
            exact
            render={() => (
              <Suspense
                fallback={<CircularProgress style={{ color: "#1878f2" }} />}
              >
                <Photos />
              </Suspense>
            )}
          />
          <Route
            path="/news"
            exact
            render={() => (
              <Suspense
                fallback={<CircularProgress style={{ color: "#1878f2" }} />}
              >
                <News />
              </Suspense>
            )}
          />
          <Route
            path="/"
            exact
            render={() => (
              <Suspense
                fallback={<CircularProgress style={{ color: "#1878f2" }} />}
              >
                <Home />
              </Suspense>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </Layout>
    ));
  return route;
}

export default App;
