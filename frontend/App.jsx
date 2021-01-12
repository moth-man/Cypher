import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Cypher from './components/Cypher';

export default function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Cypher />
      </Grid>
    </Grid>
  );
}
