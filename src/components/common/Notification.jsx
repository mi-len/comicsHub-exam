import React, { Component } from 'react'
import observer from '../infrastructure/observer';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
// import { message } from 'antd';

const DEFAULT_STATE = {
  message: '',
  loading: '',
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

  // success = () => {
  //   message.success(`${this.state.message}`);
  // };

  // error = () => {
  //   message.error(`${this.state.message}`);
  // };

  // warning = () => {
  //   message.warning(`${this.state.message}`);
  // };

  render = () => {
    // let notificationId
    // if (this.state.status === 'success') {
    //     notificationId = 'infoBox'
    // } else if (this.state.status === 'danger') {
    //     notificationId = 'errorBox'
    // } else if (this.state.status === 'info') {
    //     notificationId = 'loadingBox'
    // }

    if (this.state.message) {
      return (
        // <div>
        //  {this.warning()}
        // </div>
        <Alert variant={this.state.status} id="notifications">
          {/* <div id={notificationId} className='notification'> */}
          <span id="notif_txt">{this.state.message}

          </span>
          <Button
            id='notif_btn'
            variant={this.state.status}
            onClick={this.hideNotification} >
            X
                         </Button>
          {/* </div> */}
        </Alert>
      )
    } else {
      return null
    }
  }
}