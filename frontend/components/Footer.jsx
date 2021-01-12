import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

export default function Footer() {
  return (
    <Container maxWidth="md">
      <Grid>
        <Grid item>
          <Typography>
            Cypher footer
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
