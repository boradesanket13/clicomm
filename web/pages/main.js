import React from "react";
import { Typography, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/actions/user";

const main = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log(localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);
  return <div>{props.children}</div>;
};

export default main;
