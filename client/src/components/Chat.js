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
    var channelList = this.props.channels.map((chan, i) => {
      return (
        <li key={`channel-${chan}-${i}`}><Link to={`/${chan}`}>#{chan}</Link></li>
      )
    })
    return (
      <div className="mainContainer">
        <div id="sidebar">
          <img id="signinLogo" src="/logo.png" alt="functino"></img>
          <p id="channel">channels</p> 
          <Link to="/add/channel"><button id="addChannel"><i className="fa fa-plus-circle"></i></button> </Link>
          <ul>
             {channelList}
            </ul>
        </div>
          <div className="chatContainer">
          <div id="topbar">
            <p id="roomTitle">#{this.props.match.params.roomname}</p>
          </div>
          <div className="innerChatContainer"> 
            <div id="room">
              {this.props.messages.map((message, i) => (
                <p id="message" key={message.roomname + "-message-" + i}><span className="username">{message.username}:</span> {message.message}</p>
              ))}
            </div>
            <div id="input">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <input id="chatInput" type="text" name="message" value={this.state.message} onChange={this.handleChange} placeholder="Message"/>
                <button id="chatButton" type="submit"><i className="fa fa-angle-double-right"></i></button>
              </form>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(appState, ownProps) {
  
  const roomname = ownProps.match.params.roomname
  return {
    messages: appState.chatReducer.messages.filter(message => message.roomname === roomname),
    history: ownProps.history,
    channels: appState.chatReducer.channels
  }
}

export default connect(mapStateToProps)(Chat)