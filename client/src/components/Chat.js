import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions/chat'
import '../styles/chat.css'
import { Link } from 'react-router-dom'

class Chat extends Component {
 state = {
   message: ''
 }

 handleChange = e => {
   this.setState({
     [e.target.name]:e.target.value
   })
 }

 handleSubmit = e => {
   e.preventDefault()
   addMessage({
    message: this.state.message,
    roomname: this.props.match.params.roomname
  })

  

  // Get the form
  const form = e.target;

  // Search for the input
  const input_search = form.getElementsByTagName('input');

  // input_search returns an array, so get the first item from the search
  const input = input_search[0];

  // Get the name of the input to set it's value to nothing ('')
  const name = input.name;

  this.setState({
    [name]: ''
  })
 }
  render() {
    return (
      <div className="chatContainer">
        <div id="sidebar">
          <img id="signinLogo" src="/logo.png"></img>
          <p id="channel">Channels</p>
          <ul>
              <li><Link to="/default">Default</Link></li>
              <li><Link to="/general">General</Link></li>
              <li><Link to="/random">Random</Link></li>
            </ul>
        </div>
        <div className="innerChatContainer"> 
          <div id="room">
            {this.props.messages.map((message, i) => (
              <p key={message.roomname + "-message-" + i}><span className="username">{message.username}:</span> {message.message}</p>
            ))}
          </div>
          <div id="input">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <input id="chatInput" type="text" name="message" value={this.state.message} onChange={this.handleChange} />
              <button id="chatButton" type="submit"><i className="fa fa-angle-double-right"></i></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(appState, ownProps) {
  const roomname = ownProps.match.params.roomname
  return {
    messages: appState.chatReducer.messages.filter(message => message.roomname == roomname),
    history: ownProps.history
  }
}

export default connect(mapStateToProps)(Chat)