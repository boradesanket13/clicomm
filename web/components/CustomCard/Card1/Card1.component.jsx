import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

const ProtestCard = (props) => {
  return (
    <Box>
      <Paper>
        <Box p={1}>
          <Typography variant="h5">Test Title</Typography>
        </Box>
        <Box p={1}>
          <Typography variant="body1" color="textSecondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            soluta reprehenderit, itaque illo earum eos rerum eum sapiente,
            culpa officia, impedit possimus in voluptatem aliquid? Magnam vero
            dicta est iusto.
          </Typography>
        </Box>
        <Box p={1}>
          <Typography variant="body1" color="textSecondary">
            1.2k supporters
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProtestCard;
