import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Signup from "./Signup/Signup.component";
import Login from "./Login/Login.component";
import VerifyEmail from "./VerifyEmail/VerifyEmail.component";
import { signup, login, verifyEmail } from "../../store/actions/user";
import { setAuthModalToggle } from "../../store/actions/global";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  link: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Auth = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [signupForm, setSignupForm] = React.useState({
    name: {
      value: "",
      isValid: true,
      msg: "",
    },
    email: {
      value: "",
      isValid: true,
      msg: "",
    },
    password: {
      value: "",
      isValid: true,
      msg: "",
    },
  });
  const [loginForm, setLoginForm] = React.useState({
    email: {
      value: "",
      isValid: true,
      msg: "",
    },
    password: {
      value: "",
      isValid: true,
      msg: "",
    },
  });
  const [verifyEmailForm, setVerifyEmailForm] = React.useState({
    otp: {
      value: "",
      isValid: true,
      msg: "",
    },
  });
  const theme = useTheme();
  const authStore = useSelector((store) => store.global.auth);
  const userStore = useSelector((store) => store.user);
  let authLoading = userStore.auth.isAuthLoading;

  const resetLogin = () => {
    setLoginForm({
      email: {
        value: "",
        isValid: true,
        msg: "",
      },
      password: {
        value: "",
        isValid: true,
        msg: "",
      },
    });
  };
  const resetSignup = () => {
    setSignupForm({
      name: {
        value: "",
        isValid: true,
        msg: "",
      },
      email: {
        value: "",
        isValid: true,
        msg: "",
      },
      password: {
        value: "",
        isValid: true,
        msg: "",
      },
    });
  };
  const resetVerifyEmail = () => {
    setVerifyEmailForm({
      otp: {
        value: "",
        isValid: true,
        msg: "",
      },
    });
  };
  // const signupHandler = () => {
  //   const signupFormData = {...signupForm};
  //   signupFormData.keys().forEach(e => {
  //     if(e === 'email'){

  //     }
  //   });

  // };
  const onSignupInputChange = (e) => {
    const newForm = { ...signupForm };
    newForm[e.target.name] = {
      value: e.target.value,
      errorMsg: null,
      isValid: true,
    };
    setSignupForm(newForm);
  };

  const onLoginInputChange = (e) => {
    const newForm = { ...loginForm };
    newForm[e.target.name] = {
      value: e.target.value,
      errorMsg: null,
      isValid: true,
    };
    setLoginForm(newForm);
  };
  const onVerifyEmailInputChange = (e) => {
    const newForm = { ...verifyEmailForm };
    if (
      newForm.otp.value.length < 6 ||
      e.target.value.length < newForm.otp.value.length
    ) {
      newForm[e.target.name] = {
        value: e.target.value,
        errorMsg: null,
        isValid: true,
      };
      setVerifyEmailForm(newForm);
    }
  };

  const onSignupClick = async (e) => {
    const form = { ...signupForm };
    const keys = Object.keys(form);
    let validFlag = true;
    keys.forEach((item) => {
      if (item) {
        if (!form[item].value || form[item].value === "") {
          form[item].isValid = false;
          form[item].msg = `Please enter a valid ${item}`;
          validFlag = false;
        }
      }
    });
    setSignupForm(form);
    if (validFlag) {
      const data = {
        name: form["name"].value,
        email: form["email"].value,
        password: form["password"].value,
      };
      const signupData = await dispatch(signup(data));
      if (!signupData.error) {
        props.authSwitch("verifyEmail");
      }
    }
  };
  const onLoginClick = (e) => {
    const form = { ...loginForm };
    const keys = Object.keys(form);
    let validFlag = true;
    keys.forEach((item) => {
      if (item) {
        if (!form[item].value || form[item].value === "") {
          form[item].isValid = false;
          form[item].msg = `Please enter a valid ${item}`;
          validFlag = false;
        }
      }
    });
    setLoginForm(form);
    if (validFlag) {
      const data = {
        email: form["email"].value,
        password: form["password"].value,
      };
      dispatch(login(data))
        .then((res) => {
          if (!res.error) {
            dispatch(setAuthModalToggle(false));
          }
        })
        .catch((err) => {});
    }
  };
  const onVerifyEmailSubmit = (e) => {
    const form = { ...verifyEmailForm };
    const keys = Object.keys(verifyEmailForm);
    let validFlag = true;
    keys.forEach((item) => {
      if (item) {
        if (!form[item].value || form[item].value === "") {
          form[item].isValid = false;
          form[item].msg = `Please enter a valid ${item}`;
          validFlag = false;
        }
      }
    });
    setVerifyEmailForm(form);
    if (validFlag) {
      const data = {
        otp: form["otp"].value,
      };
      dispatch(verifyEmail(data))
        .then((res) => {
          if (!res.error) {
            dispatch(setAuthModalToggle(false));
          }
        })
        .catch((err) => {});
    }
  };
  let mainAction = onLoginClick;
  if (authStore.modalName === "login") {
    mainAction = onLoginClick;
  } else if (authStore.modalName === "signup") {
    mainAction = onSignupClick;
  } else if(authStore.modalName === "verifyEmail"){
    mainAction = onVerifyEmailSubmit;
  }
  return (
    <Box className={styles.root} p={2}>
      <form action="none" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Box mb={0.5}>
            <Typography variant="h5" color="textPrimary" align="center">
              {authStore.modalTitle}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body1" color="textSecondary" align="center">
              {authStore.modalDescription}
            </Typography>
          </Box>
          {authStore.modalName === "login" && (
            <>
              <Login
                onInputChange={onLoginInputChange}
                form={loginForm}
                reset={resetLogin}
              />
            </>
          )}
          {authStore.modalName === "signup" && (
            <>
              <Signup
                onInputChange={onSignupInputChange}
                form={signupForm}
                reset={resetSignup}
              />
              <Box mb={1}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  By clicking on sign up you agree to our{" "}
                  <span className={styles.link}>Terms and Conditions</span> and{" "}
                  <span className={styles.link}>Privacy Policy</span>
                </Typography>
              </Box>
            </>
          )}
          {authStore.modalName === "verifyEmail" && (
            <>
              <VerifyEmail
                onInputChange={onVerifyEmailInputChange}
                form={verifyEmailForm}
                reset={resetVerifyEmail}
              />

              <Box mb={1}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  We have sent a 6 digit OTP to your email.{" "}
                  <span
                    className={styles.link}
                    onClick={() => {
                      resetSignup();
                      props.authSwitch("login");
                    }}
                  >
                    Resend OTP
                  </span>
                </Typography>
              </Box>
            </>
          )}
        </div>
        <Button
          onClick={mainAction}
          fullWidth
          variant="contained"
          color="primary"
          disabled={authLoading}
          size="large"
          type="submit"
          startIcon={
            authLoading ? (
              <CircularProgress
                color="primary"
                style={{ width: "20px", height: "   20px" }}
              />
            ) : null
          }
        >
          {authStore.modalName === "login" && "Login"}
          {authStore.modalName === "signup" && "Create"}
          {authStore.modalName === "verifyEmail" && "Verify"}
        </Button>
      </form>
      <Box mt={1}>
        <Typography color="textSecondary" align="center" variant="body2">
          {authStore.modalName === "login" && (
            <>
              Don't have an account?{" "}
              <span
                className={styles.link}
                onClick={() => {
                  resetLogin();
                  props.authSwitch("signup");
                }}
              >
                Signup
              </span>
            </>
          )}
          {authStore.modalName === "signup" && (
            <>
              Already have an account?{" "}
              <span
                className={styles.link}
                onClick={() => {
                  resetSignup();
                  props.authSwitch("login");
                }}
              >
                Login
              </span>
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default Auth;
