import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Peer from 'peerjs';
import io from 'socket.io-client';
import Stream from './Stream';

export default function Cypher() {
  const [myStream, setMyStream] = useState(null);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    (async function getStream() {
      setMyStream(await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      }));
    }());
  }, []);

  useEffect(() => {
    if (!myStream) return;

    const socket = io('http://localhost:3000');

    const peer = new Peer(undefined, {
      path: '/peerjs',
      host: '/',
      port: '3000',
    });

    // Them calling us.
    peer.on('call', (call) => {
      call.answer(myStream);
      call.on('stream', (stream) => {
        console.log('call from', stream);
      });
    });

    peer.on('open', (id) => {
      socket.emit('join-room', 'User connected.', id);
    });

    // Us calling them.
    socket.on('user-connected', (userID) => {
      const call = peer.call(userID, myStream);
      call.on('stream', (stream) => {
        console.log('call to', stream);
      });
    });
  }, [myStream]);

  if (!myStream) {
    return null;
  }

  console.log('my stream', myStream);
  return (
    [myStream].concat(streams).map((stream) => <Stream stream={stream} />)
  );
}
