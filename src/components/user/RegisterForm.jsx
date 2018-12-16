import React, { Component } from 'react'
import requester from '../infrastructure/requester';
import observer from '../infrastructure/observer'

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            error: ''
        }

    }

    handleChange = ev => {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value
        this.setState({ [fieldName]: fieldValue })
        let repeatPass = ev.target.repeatPass
    }

    handleSubmit = ev => {
        ev.preventDefault()

        if (this.state.password.length < 5) {
            this.setState({
                error: 'Password must be more than 5 symbols'
            })

            return
        } else if (this.state.password.length > 20) {
            this.setState({
                error: 'Password must be less than 20 symbols'
            })

            return
        } else if (this.state.username.length < 5) {
            this.setState({
                error: 'Username must be more than 5 symbols'
            })

            return
        } else if (this.state.password !== this.state.repeatPass) {
            this.setState({
                error: 'Both passwords do not match!'
            })

            return
        } else {
            this.setState({
                error: ''
            })
        }

        requester.post('user', '', 'basic', this.state)
        .then(res => {
            observer.trigger(observer.events.loginUser, res.username)
            sessionStorage.setItem('authtoken', res._kmd.authtoken)
            sessionStorage.setItem('publisher', res.username)
            sessionStorage.setItem('id', res._id)
            this.props.history.push('/ads')  
        })
    }

    render = () => {
        return(
            <form id="registerForm" onSubmit={this.handleSubmit}>
            <div className='error_msg'>{this.state.error}</div>
                <h2>Register</h2>
                <label>Username:</label>
                <input name="username" onChange={this.handleChange} type="text" /><br/>
                <label>Password:</label>
                <input name="password" onChange={this.handleChange} type="password" /><br/>
                <label>Repeat Password:</label>
                <input name="repeatPass" onChange={this.handleChange} type="password" /><br/>
                <input id="btnRegister" value="Register" type="submit" />
            </form>
        )
    }
}