import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Peer from 'peerjs';
import Stream from './Stream';

export default function Cypher() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    (async function getStream() {
      setStreams([await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })]);
    }());
    const peer = new Peer(undefined, {
      path: '/peerjs',
      host: '/',
      port: '3030',
    });
    peer.on('call', (call) => {
      call.answer(streams[0]);
      call.on('stream', (stream) => {
        setStreams(streams.concat(stream));
      });
    });
  }, []);

  if (!streams.length) {
    return null;
  }

  return (
    streams.map((stream) => <Stream stream={stream} />)
  );
}
