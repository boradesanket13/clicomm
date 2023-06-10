import * as actionTypes from "../actionTypes";

const initialState = {
  auth: {
    isAuthenticated: false,
    refreshToken: null,
    accessToken: null,
    isAuthLoading: false,
  },
  userData: {
    user: null,
  },
};

const reducer = (state = initialState, action) => {
  const { data } = action || {};
  switch (action.type) {
    case actionTypes.REQUEST__SIGNUP:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthLoading: true,
        },
      };
    case actionTypes.ERROR__SIGNUP:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthLoading: false,
        },
      };
    case actionTypes.SUCCESS__SIGNUP:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthLoading: false,
          isAuthenticated: true,
        },
        userData: {
          user: data.data.user,
        },
      };
    case actionTypes.REQUEST__LOGIN:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthLoading: true,
        },
      };
    case actionTypes.ERROR__LOGIN:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthLoading: false,
        },
      };
    case actionTypes.SUCCESS__LOGIN:
      localStorage.setItem("user", JSON.stringify(data.data.user));
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthLoading: false,
          isAuthenticated: true,
        },
        userData: {
          user: data.data.user,
        },
      };
    case actionTypes.REQUEST__VERIFY_EMAIL:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthLoading: true,
        },
      };
    case actionTypes.ERROR__VERIFY_EMAIL:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthLoading: false,
        },
      };
    case actionTypes.SUCCESS__VERIFY_EMAIL:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthLoading: false,
        },
        userData: {
          user: data.data.user,
        },
      };
    case actionTypes.SET_USER:
      console.log({ data });
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          isAuthLoading: false,
        },
        userData: {
          user: data,
        },
      };
    default:
      return state;
  }
};

export default reducer;
