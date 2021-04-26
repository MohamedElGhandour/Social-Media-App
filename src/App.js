import React from "react";
import Layout from "./hoc/layout/index";
import Home from "./containers/Home/index";
import Auth from "./containers/auth/Login/index";
import Logout from "./containers/auth/Logout/index";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { authCheckState, fetchUsers } from "./store/actions/index";
import "./App.css";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  dispatch(authCheckState());
  dispatch(fetchUsers());
  // React.useEffect(() => {

  // }, [dispatch]);
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
          <Route exact path="/profile" />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    ));
  return route;
}

export default App;
