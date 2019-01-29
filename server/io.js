import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  io.on('connection', function(socket){
    socket.join('default')
    //this is to add a new channel
    socket.on('add channel', (channel) => {
      socket.join(channel)
      socket.emit('add channel', channel)
    })
    socket.on('new message', (message) => {
      io.to(message.roomname).emit('new message', message)
    })

    console.log('User has connected to socket server')
  })
}