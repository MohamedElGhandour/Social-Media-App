import React, { Suspense } from "react";
import Layout from "./hoc/layout/index";
import Home from "./components/Home/index";
import Auth from "./containers/auth/Login/index";
import Logout from "./containers/auth/Logout/index";
import People from "./components/People/index";
import Photos from "./components/Photos/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { authCheckState } from "./store/actions/index";
import "./App.css";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);
  let route = (
    <Switch>
      <Route exact path="/auth" component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );
  token !== null &&
    (route = (
      <Layout>
        <Switch>
          <Route path="/profile" />
          <Route
            path="/logout"
            render={() => (
              <Suspense fallback={<CircularProgress />}>
                <Logout />
              </Suspense>
            )}
          />
          <Route
            path="/people"
            render={() => (
              <Suspense fallback={<CircularProgress />}>
                <People />
              </Suspense>
            )}
          />
          <Route
            path="/photos"
            render={() => (
              <Suspense fallback={<CircularProgress />}>
                <Photos />
              </Suspense>
            )}
          />
          <Route
            path="/"
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
