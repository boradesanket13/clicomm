import React from "react";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Paper,
  Chip,
  Dialog,
  Grow,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import IosClose from "react-ionicons/lib/IosClose";
import Lottie from "react-lottie";
import animationData from "../../assets/lottiefiles/world_events.json";

import Header from "../../components/Header/Header.component";
import Navigation from "../../components/Navigation/Navigation.component";
import Layout from "../../hoc/Layout/Layout.container";
import ProtestCard from "../../components/CustomCard/Card1/Card1.component";
import AuthModal from "../../components/Auth/AuthModal.component";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

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

const Home = (props) => {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    updateEvents();
  }, []);

  const updateEvents = () => {
    const updatedEvents = localStorage.getItem("events");
    if (updatedEvents) {
      setEvents(JSON.parse(updatedEvents));
    } else {
      setEvents([]);
    }
  };
  const [isModalOpen, setModalOpen] = React.useState(false);
  const onClickModalClose = () => {
    setModalOpen(false);
  };
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const renderEvents = () => {
    const e = [...events];
    if (e.length > 0) {
      return e.map((i) => {
        return (
          <Box mt={2}>
            <Paper>
              <Box p={3}>
                <Box mb={1}>
                  <Typography color="primary" variant="h6">
                    {i.name}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body1">{i.description}</Typography>
                </Box>
                <Box mb={2}>
                  <Chip color="primary" label={i.location}></Chip>
                </Box>
                <Box mb={2}>
                  <Chip label={i.date}></Chip>
                </Box>
              </Box>
            </Paper>
          </Box>
        );
      });
    } else {
      return (
        <Box textAlign="center ">
          <Lottie options={lottieOptions} height={400} width={700} />
          <Box mt={2}>
            <Typography>
              Organise an event and help spread awareness about climate change
            </Typography>
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Create Event
            </Button>
          </Box>
        </Box>
      );
    }
  };

  return (
    <Layout>
      <AuthModal />
      <Navigation />
      <Box>
        <Box display="flex" justifyContent="space-between" mx={4} my={2}>
          <Typography>Events</Typography>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Create Event
          </Button>
          <CreateEventDialog
            updateEvents={updateEvents}
            isOpen={isModalOpen}
            onClickModalClose={onClickModalClose}
          />
        </Box>
        <Box pr={6} pl={6}>
          {renderEvents()}
        </Box>
      </Box>
    </Layout>
  );
};

const CreateEventDialog = (props) => {
  const { isOpen } = props || {};
  const [] = React.useState();
  const [form, setForm] = React.useState({
    name: {
      value: "",
    },
    description: {
      value: "",
    },
    location: {
      value: "",
    },
    date: {
      value: "",
    },
  });

  const styles = useStyles();
  const onCloseHandler = () => {
    props.onClickModalClose();
  };

  const addEvent = () => {};

  const onFormChange = (field) => {
    const name = field.target.name;
    const value = field.target.value;
    setForm((prev) => ({
      ...prev,
      [name]: {
        value,
      },
    }));
  };
  const resetForm = () => {
    setForm({
      name: {
        value: "",
      },
      description: {
        value: "",
      },
      location: {
        value: "",
      },
      date: {
        value: "",
      },
    });
  };
  const onCreateClick = (updateEvents) => {
    let localEvents = localStorage.getItem("events");
    const newEvent = {
      name: form.name.value,
      description: form.description.value,
      location: form.location.value,
      date: form.date.value,
    };
    if (localEvents) {
      localEvents = JSON.parse(localEvents);
      localEvents.push(newEvent);
      localStorage.setItem("events", JSON.stringify(localEvents));
    } else {
      localStorage.setItem("events", JSON.stringify([newEvent]));
    }
    props.updateEvents();
    onCloseHandler();
    resetForm();
  };
  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      scroll="paper"
      fullWidth
      TransitionComponent={Transition}
      className={styles.container}
    >
      <Box className={styles.closeBtn}>
        <IconButton style={{ padding: "5px" }} onClick={() => onCloseHandler()}>
          <IosClose fontSize="35px" color="#ddd" />
        </IconButton>
      </Box>
      <Box p={2} width="100%" pt={7}>
        <Box mb={1}>
          <Typography>Create Event</Typography>
        </Box>
        <Box mb={2}>
          <TextField
            variant="outlined"
            placeholder="Name"
            name="name"
            onChange={onFormChange}
            value={form["name"].value}
            fullWidth
          ></TextField>
        </Box>
        <Box mb={2}>
          <TextField
            variant="outlined"
            placeholder="Description"
            name="description"
            onChange={onFormChange}
            value={form["description"].value}
            fullWidth
          ></TextField>
        </Box>
        <Box mb={2}>
          <TextField
            variant="outlined"
            name="location"
            placeholder="Location"
            onChange={onFormChange}
            value={form["location"].value}
            fullWidth
          ></TextField>
        </Box>
        <Box mb={2}>
          <TextField
            variant="outlined"
            name="date"
            placeholder="Date"
            onChange={onFormChange}
            value={form["date"].value}
            fullWidth
          ></TextField>
        </Box>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onCreateClick(props.updateEvents)}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Home;
