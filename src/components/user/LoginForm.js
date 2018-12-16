import React, { Component } from 'react'
import requester from '../infrastructure/requester';
import observer from '../infrastructure/observer'

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = ev => {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value

        this.setState({ [fieldName]: fieldValue  })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        
        requester.post('user', 'login', 'basic', this.state)
            .then(res => {
                observer.trigger(observer.events.loginUser, res.username)
                observer.trigger(observer.events.notification, { status: 'success', message: 'Success'})
                sessionStorage.setItem('authtoken', res._kmd.authtoken)
                sessionStorage.setItem('publisher', res.username)
                sessionStorage.setItem('id', res._id)
                this.props.history.push('/ads')   
            })
            .catch(res => 
                observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error}) )
    }
    
    render = () => {
        return(
            <form id="loginForm" onSubmit={this.handleSubmit}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input name="username" onChange={this.handleChange} type="text" />
                <label>Password:</label>
                <input name="password" onChange={this.handleChange} type="password" />
                <input id="btnLogin" value="Sign In" type="submit" />
            </form>
        )
    }
}