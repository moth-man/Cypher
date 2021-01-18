import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Peer from 'peerjs';
import io from 'socket.io-client';
import Stream from './Stream';
import { SocketContext } from './contexts';

export default function Cypher() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3030');

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

    // Them calling us.
    peer.on('call', (call) => {
      call.answer(streams[0]);
      call.on('stream', (stream) => {
        setStreams(streams.concat(stream));
      });
    });

    peer.on('open', (id) => {
      socket.emit('join-room', 'boobies', id);
      console.log('OPEN PEER', id);
    });

    // Us calling them.
    socket.on('user-connected', (userID) => {
      console.log('THIS USERID', userID);
      const call = peer.call(userID, streams[0]);
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
