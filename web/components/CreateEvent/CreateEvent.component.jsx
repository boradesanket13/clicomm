import React from "react";
import { TextField, Button } from "@material-ui/core";

const CreateEvent = () => {
  return (
    <div>
      <TextField
        label="Event Name"
        fullWidth
        variant="outlined"
        name="eventName"
        type="text"
      />
      <TextField
        label="Event Description"
        fullWidth
        variant="outlined"
        name="eventDescription"
        type="text"
      />
      <TextField
        label="Event Location"
        fullWidth
        variant="outlined"
        name="eventLocation"
        type="text"
      />
      <Button variant="contained" fullWidth>
        Create
      </Button>
    </div>
  );
};

export default CreateEvent;
