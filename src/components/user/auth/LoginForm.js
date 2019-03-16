import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

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
    this.setState({ [fieldName]: fieldValue })
  }

  handleSubmit = ev => {
    ev.preventDefault()

    const form = ev.currentTarget;
    if (form.checkValidity() === false) {
      ev.target[0].value = ''
      ev.stopPropagation();
      return
    }

    this.setState({ validated: true })

    requester.post('user', 'login', 'basic', this.state)
      .then(res => {
        
        observer.trigger(observer.events.loginUser, res.username)
        observer.trigger(observer.events.notification, { status: 'success', message: 'Login successful' })
        observer.trigger(observer.events.isAdmin, res.isAdmin)
        sessionStorage.setItem('authtoken', res._kmd.authtoken)
        sessionStorage.setItem('publisher', res.username)
        sessionStorage.setItem('id', res._id)

        // checkForAdmin.isAdmin()

        this.props.history.push('/ads')
      })
      .catch(res =>
        observer.trigger(observer.events.notification, { status: 'danger', message: res.responseJSON.error }))
  }

  render = () => {
    const { username, password } = this.state;
    return (
      <Container>
        <Form
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              onChange={this.handleChange}
              placeholder="Enter username" />
            <Form.Control.Feedback type="invalid">
              Please provide a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Button value="Sign In" variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}