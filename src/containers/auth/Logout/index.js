import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { authLogout } from "../../../store/actions/index";

const Logout = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(authLogout());
  });
  return <Redirect to="/" />;
};
export default Logout;
