import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  useTheme,
} from "@material-ui/core";

const Signup = ({ onInputChange, form }) => {
  return (
    <Box>
      <Box
        mb={1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Enter OTP"
          name="otp"
          variant="outlined"
          fullWidth
          // style={{
          //   width: "60%",
          // }}
          onChange={onInputChange}
          value={form.otp.value}
          error={!form.otp.isValid}
          helperText={form.otp.msg}
        />
      </Box>
    </Box>
  );
};

export default Signup;
