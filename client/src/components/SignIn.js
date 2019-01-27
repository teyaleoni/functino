import React, { Component } from 'react'
import { assignUsername } from '../actions/chat'


class SignIn extends Component {
  state = {
      username: ''
  }

  handleSubmit = e => {
      e.preventDefault()
      assignUsername(this.state.username).then(() => {
          this.props.history.push('/default')
      })
  }

  handleChange = e => {
      this.setState({
          [e.target.name]:e.target.value
      })
  }

  render() {
    return (
      <form autocomplete="off"onSubmit={this.handleSubmit}>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Enter a username" />
          <button type="submit">Sign In</button>
          
      </form>
    )
  }
}

export default SignIn
