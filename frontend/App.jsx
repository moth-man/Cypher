import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Peer from 'peerjs';
import Footer from './components/Footer';
import Header from './components/Header';
import Cypher from './components/Cypher';

export default function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Cypher />
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}
