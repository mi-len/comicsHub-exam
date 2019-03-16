import React, { Component } from 'react'
import observer from '../infrastructure/observer';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
// import { message } from 'antd';

const DEFAULT_STATE = {
  message: '',
  status: ''
}

export default class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = DEFAULT_STATE

    observer.subscribe(observer.events.notification, this.showNotification)
  }

  showNotification = (data) => {
    let message = data.message
    let status = data.status
    this.setState({ message: message })
    this.setState({ status: status })
  }

  hideNotification = ev => this.setState(DEFAULT_STATE)

  render = () => {

    if (this.state.message) {
      return (
        <Alert variant={this.state.status} id="notifications">
          <span id="notif_txt">
            {this.state.message}
          </span>
          <Button
            id='notif_btn'
            variant={this.state.status}
            onClick={this.hideNotification} >
            X
          </Button>
        </Alert>
      )
    } else {
      return null
    }
  }
}