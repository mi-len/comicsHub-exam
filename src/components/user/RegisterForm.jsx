import React, { Component } from 'react'
import requester from '../infrastructure/requester';
import observer from '../infrastructure/observer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

export default class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: '',
      validated: false
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

    const form = ev.currentTarget;
    if (form.checkValidity() === false) {
      ev.target[0].value = ''
      ev.stopPropagation();
    }

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
        observer.trigger(observer.events.notification, { status: 'success', message: 'You have register successfully' })
        sessionStorage.setItem('authtoken', res._kmd.authtoken)
        sessionStorage.setItem('publisher', res.username)
        sessionStorage.setItem('id', res._id)
        this.props.history.push('/ads')
      })
  }

  render = () => {
    const { validated } = this.state;
    return (
      <Container>
        <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
          {this.state.error ? <Alert variant="danger" className='error_msg'>{this.state.error}</Alert> : null}
          <Form.Group controlId="formBasicUser">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              onChange={this.handleChange}
              placeholder="Enter username" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
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
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="repeatPass"
              onChange={this.handleChange}
              placeholder="Confirm password" />
            <Form.Control.Feedback type="invalid">
              Please repeat the password.
            </Form.Control.Feedback>
          </Form.Group>
          <Button value="Register" variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}