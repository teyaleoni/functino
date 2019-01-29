import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { addChannel } from "../actions/chat"
import '../styles/addchannel.css'

class AddChannel extends Component {
    state = {
        addChannel: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        addChannel(this.state.addChannel)
        this.props.history.push(`/${this.state.addChannel}`)
        
    }

    cancel = (e) => {
        e.preventDefault()
        this.props.history.goBack()
    }


    render() {
        return (
            <div className="addChannelContainer">
                <h1>Create a channel</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <label htmlFor="addChannel">Name</label>
                    <input
                        id="addInput"
                        onChange={this.handleChange}
                        type="text"
                        name="addChannel"
                        value={this.state.addChannel}
                        placeholder=" e.g. The $QUADDD" />
                    <br />
                    <button className="addbutton" onClick={this.cancel}>Cancel</button>
                    <button className="addbutton" type="submit" id="submit">Create Channel</button>
                </form>
            </div>
        )
    }
}

export default AddChannel