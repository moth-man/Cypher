import React, { useCallback } from 'react';
import { Box } from '@material-ui/core/';

export default function Stream({ stream, muted }) {
  console.log(stream, muted);
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
      <video muted={muted} autoPlay ref={videoRef} />
    </Box>
  );
}
