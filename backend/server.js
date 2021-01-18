// Express
const express = require('express')
const app = express()

// Socket io
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

// Peer
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

// UUID
// const { v4: uuidV4 } = require('uuid')

app.use('/peerjs', peerServer);


io.on('connection', client => {

  client.on('join-room', (roomId, userId) => {
    client.join(roomId)
    client.to(roomId).broadcast.emit('user-connected', userId);

    client.on('disconnect', () => {
      client.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)
