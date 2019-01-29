import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'

axios.defaults.baseURL = '/api'

const socket = io.connect('http://localhost:3001')

export function addMessage(message) {
  const username = store.getState().chatReducer.username
 
  socket.emit('new message', {
    roomname: message.roomname,
    username: username,
    message: message.message
  }) 
}

export function assignUsername(username) {
  var promise = new Promise((resolve, reject) => {
    store.dispatch({
      type: 'SIGN_IN',
      username: username
    })

    resolve()
  })
 
  return promise
}

socket.on('new message', (message) => {
     
  store.dispatch({
    type: 'ADD_MESSAGE',
    message: message
  })
 
})  

 //emits to socket that a new channel is to be added by name
export function addChannel(channel) {
  socket.emit('add channel', channel)

}
 //goes together with above
socket.on('add channel', (channel) => {
  store.dispatch({
    type:'ADD_CHANNEL',
    channel: channel
  })
})