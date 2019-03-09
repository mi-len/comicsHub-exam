import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import requester from '../infrastructure/requester'
import observer from '../infrastructure/observer'

export default class Logout extends Component {
  logout = () => {
    requester.post('user', '_logout', 'kinvey')
      .then(() => {
        sessionStorage.clear()
        observer.trigger(observer.events.loginUser, null)
        observer.trigger(observer.events.notification, { status: 'success', message: 'Logout successfull' })
      })
  }

  render = () => {
    this.logout();

    return <Redirect to='/' />
  }
}
