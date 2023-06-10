import React from "react";
import { Box, Grid, Button, TextField } from "@material-ui/core";

import Navigation from "../../components/Navigation/Navigation.component";
import Layout from "../../hoc/Layout/Layout.container";
import Auth from "../../components/Auth/Auth.component";

const Home = (props) => {
  const [authOpen, setAuthOpen] = React.useState(false);

  const onAuthClose = () => {
    setAuthOpen(false);
  };

  return (
    <Layout>
      <Navigation />
      <Auth />
    </Layout>
  );
};

export default Home;
