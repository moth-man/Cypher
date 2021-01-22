import React, { useEffect, useCallback, useState } from 'react';
import { Box, Typography } from '@material-ui/core/';
import { NavLink } from 'react-router-dom';

export default function Stream({ stream }) {
  const videoRef = useCallback((video) => {
    if (video !== null) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, []);

  return (
    <Box>
      <video muted ref={videoRef} />
    </Box>
  );
}
