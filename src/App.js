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
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
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
              <Suspense fallback={<CircularProgress />}>
                <Profiles />
              </Suspense>
            )}
          />
          <Route
            path="/logout"
            exact
            render={() => (
              <Suspense fallback={<CircularProgress />}>
                <Logout />
              </Suspense>
            )}
          />
          <Route
            path="/people"
            exact
            render={() => (
              <Suspense fallback={<CircularProgress />}>
                <People />
              </Suspense>
            )}
          />
          <Route
            path="/photos"
            exact
            render={() => (
              <Suspense fallback={<CircularProgress />}>
                <Photos />
              </Suspense>
            )}
          />
          <Route
            path="/news"
            exact
            render={() => (
              <Suspense fallback={<CircularProgress />}>
                <News />
              </Suspense>
            )}
          />
          <Route
            path="/"
            exact
            render={() => (
              <Suspense fallback={<CircularProgress />}>
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
