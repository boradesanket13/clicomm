import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link } from "next/link";

import AccountPopup from "../AccountPopup/AccountPopup.component";
import { setAuthModalToggle } from "../../store/actions/global";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    width: "40px",
    height: "40px",
  },
  sec1: {
    flexGrow: 1,
  },
}));

const Navigation = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  return (
    <AppBar position="static" className={styles.container} elevation={0}>
      <Toolbar>
        <Box mr={1}>
          <img
            src="/images/clicomm_logo.png"
            alt="logo"
            className={styles.logo}
          />
        </Box>
        <Typography variant="h6">
          CliComm 
        </Typography>

        <Box className={styles.sec1}></Box>
        <Button
          color="inherit"
          color="primary"
          variant="contained"
          disableElevation
          onClick={() => {
            dispatch(setAuthModalToggle(true));
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
