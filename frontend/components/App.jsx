import React, { useEffect } from 'react';
import { Landing } from './layouts';
import socketIOClient from "socket.io-client";


export default function App() {
  useEffect(() => {
    const socket = socketIOClient('http://localhost:3000/');
    
    socket.on('connect', () => {
      socket.emit('salutations', 'Hello!', { 'mr': 'john' }, Uint8Array.from([1, 2, 3, 4]));
    });

    socket.on('greetings', console.log);

  }, []);

  return (
    <Landing>
      <div>
        <h1>Cypher</h1>
      </div>
    </Landing>
  );
}
