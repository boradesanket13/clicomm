import React from "react";
import { Box, Grid, Button, TextField } from "@material-ui/core";

import Header from "../../components/Header/Header.component";
import Navigation from "../../components/Navigation/Navigation.component";
import Layout from "../../hoc/Layout/Layout.container";
import ProtestCard from "../../components/CustomCard/Card1/Card1.component";
import AuthModal from "../../components/Auth/AuthModal.component";
import CreativeBox from "../../components/CreativeBox/CreativeBox.component";

const Home = (props) => {
  const [authOpen, setAuthOpen] = React.useState(false);

  const onAuthClose = () => {
    setAuthOpen(false);
  };

  return (
    <Layout>
      <AuthModal />
      <Navigation />
      <Header />
      <Grid container>
        <Grid item md={6}>
          
        </Grid>
        <Grid item md={6}>
          {/* <CreativeBox type="box1" /> */}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
