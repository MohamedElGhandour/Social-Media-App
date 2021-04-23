import React from "react";
import Layout from "./hoc/layout/index";
import Home from "./containers/Home/index";
import Auth from "./containers/auth/index";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  let route = (
    <Switch>
      <Route exact path="/auth" component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );
  true &&
    (route = (
      <Layout>
        <Switch>
          <Route exact path="/profile" />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    ));
  return route;
}

export default App;
