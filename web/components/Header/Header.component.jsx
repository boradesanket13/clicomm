import React from "react";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
  },
}));

const Header = (props) => {
  const styles = useStyles();

  return (
    <Box p={10} mx={3} mt={1} textAlign="center" className={styles.container}>
      <Box mb={2}>
        <Typography variant="h3" align="center" style={{ fontWeight: "bold" }}>
          Let's not look for a change, Let's be the change
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1" align="center" color="textSecondary">
          With CliComm explore the events promoting climate awareness or
          organise your own event and be the change
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box mr={2}>
          <Link href="/events">
            <Button color="primary" variant="contained" size="large">
              View Events
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
