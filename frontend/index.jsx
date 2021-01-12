import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client';
import App from './App';
import { SocketContext } from './components/contexts';

const socket = io('http://localhost:3030');

ReactDOM.render(
  <BrowserRouter>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
