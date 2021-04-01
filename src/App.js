import React from "react";
import Layout from "./hoc/layout/index";
import Home from "./containers/Home/index";
import { Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  let route = <Layout></Layout>;
  true &&
    (route = (
      <Layout>
        <Switch>
          <Route exact path="/profile" />
          <Route path="/" component={Home} />
          {/* <Redirect /> */}
        </Switch>
      </Layout>
    ));
  return route;
}

export default App;
