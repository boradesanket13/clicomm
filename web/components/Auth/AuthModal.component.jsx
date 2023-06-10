import React, { useState } from "react";
import { Dialog, Button, Box, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grow, IconButton } from "@material-ui/core";
import IosClose from "react-ionicons/lib/IosClose";

import { setAuthModal } from "../../store/actions/global";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

import Auth from "./Auth.component";
import { setAuthModalToggle } from "../../store/actions/global";

const useStyles = makeStyles((theme) => ({
  // buttongrp: {
  //   width: "60%",
  //   padding: "1rem",
  //   boxSizing: "border-box",
  // },
  container: {
    position: "relative",
  },
  containerPaper: {
    minHeight: "500px",
    display: "flex",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AuthModal = (props) => {
  const styles = useStyles();
  const isOpen = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.global.auth.modalOpen);
  console.log(modalOpen);
  const inputChangedHandler = (e) => {
    const updatedUserData = { ...userData };
    updatedUserData[e.target.name] = e.target.value;
    setUserData(updatedUserData);
  };

  const onCloseHandler = () => {
    dispatch(setAuthModalToggle(false));
  };

  const onSubmitHandler = () => {
    // interact with backend
  };
  const onModalSwitch = (modalName) => {
    let modalConfig = { name: "", description: "" };
    if (modalName === "login") {
      modalConfig.name = "Login";
      modalConfig.description =
        "Login to your existing account to start or join a protest";
    } else if (modalName === "signup") {
      modalConfig.name = "Create Account";
      modalConfig.description =
        "Create a new ThatProtest account to start or join a protest";
    }else if(modalName = "verifyEmail"){
      modalConfig.name = "Verify Email";
      modalConfig.description =
        "You are one step ahead of changing the world";
    }
    dispatch(
      setAuthModal({
        modalOpen: true,
        modalTitle: modalConfig.name,
        modalDescription: modalConfig.description,
        // isLogin: isLogin,
        modalName,
      })
    );
  };
  console.log(userData);
  return (
    <Dialog
      open={modalOpen}
      onClose={onCloseHandler}
      maxWidth="sm"
      scroll="paper"
      fullWidth
      TransitionComponent={Transition}
      className={styles.container}
      PaperProps={{
        className: styles.containerPaper,
      }}
    >
      <Box className={styles.closeBtn}>
        <IconButton style={{ padding: "5px" }} onClick={() => onCloseHandler()}>
          <IosClose fontSize="35px" color="#ddd" />
        </IconButton>
      </Box>
      <Box p={2} width="100%">
        <Auth
          isSignup={isSignup}
          changed={(e) => inputChangedHandler(e)}
          submitHandler={onSubmitHandler}
          authSwitch={onModalSwitch}
        />
      </Box>
      {/* <div className={styles.buttongrp}>
        <Button
          onClick={() => setIsSignup(true)}
          className={isSignup ? styles.active : ""}
        >
          Signup
        </Button>
        <Button
          onClick={() => setIsSignup(false)}
          className={!isSignup ? styles.active : ""}
        >
          Login
        </Button>
      </div> */}
    </Dialog>
  );
};

export default AuthModal;
