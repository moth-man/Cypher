const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "*"  }
})
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
// const { v4: uuidV4 } = require('uuid')

app.use('/peerjs', peerServer);

io.on('connection', client => {
  client.on('message', console.log);
  client.on('join-room', (roomId, userId) => {
    client.join(roomId)
    console.log("RoomID", roomId);
    console.log("UserID", userId);
    client.to(roomId).broadcast.emit('user-connected', userId);

    client.on('disconnect', () => {
      client.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(process.env.PORT||3030)