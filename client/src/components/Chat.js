import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions/chat'
import '../styles/chat.css'

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
 }
  render() {
    return (
      <div className="chatContainer">
        <div id="room">
          {this.props.messages.map(message => (
            <p>{message.username}: {message.message}</p>
          ))}
        </div>
        <form autocomplete="off" onSubmit={this.handleSubmit}>
          <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
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