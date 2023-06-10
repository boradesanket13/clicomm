import callApi from "../../helpers/api";
import * as actionTypes from "../actionTypes/index";

export const signup = (data) => {
  const { name, email, password } = data;
  return (dispatch) => {
    if (!email || !password || !name) {
      Promise.reject({ error: "data is not valid" });
    }
    const signupData = {
      name,
      email,
      password,
    };
    return callApi("/user/signup", signupData, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__SIGNUP,
    });
  };
};
export const login = (data) => {
  const { email, password } = data;
  return (dispatch) => {
    if (!email || !password) {
      Promise.reject({ error: "data is not valid" });
    }
    const signupData = {
      email,
      password,
    };
    return callApi("/user/login", signupData, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__LOGIN,
    });
  };
};

export const verifyEmail = (data) => {
  const { otp } = data;
  return (dispatch) => {
    if (!otp) {
      Promise.reject({ error: "data is not valid", data });
    }
    const body = {
      otp,
    };
    return callApi("/user/verify-email", body, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__VERIFY_EMAIL,
    });
  };
};

export const setUser = (user) => {
  console.log(user);
  return {
    type: actionTypes.SET_USER,
    data: user,
  };
};

export const test = () => {
  return (dispatch) => {
    return callApi("/user/test", null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__VERIFY_EMAIL,
    });
  };
};
