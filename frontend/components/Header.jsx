import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" style={{ margin: '-1px' }}>
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          Cypher
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
