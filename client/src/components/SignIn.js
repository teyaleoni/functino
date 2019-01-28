import React, { Component } from 'react'
import { assignUsername } from '../actions/chat'
import '../styles/signin.css'


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
        <div>
            <form id="signinForm" autoComplete="off"onSubmit={this.handleSubmit}>
                <img id="signinLogo" src="/logo.png"></img>
                <h1 id="signinTitle">Create a Username</h1>
                <div className="username-input-container">
                    <input id="signinInput" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <br />
                    <button id="signinButton" type="submit">Sign In</button>
                </div>
            </form>
        </div>
    )
  }
}

export default SignIn
