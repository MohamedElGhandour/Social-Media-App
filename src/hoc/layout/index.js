import React from "react";
import Toolbar from "../../components/Navigation/Toolbar/index";

export default function Layout(props) {
  return (
    <React.Fragment>
      <Toolbar />
      {props.children}
    </React.Fragment>
  );
}
