import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import requester from '../../infrastructure/requester'

export default class Delete extends Component {

  endpoind = 'adverts/' + this.props.match.params.id

  componentDidMount = () => {

    requester.remove('appdata', this.endpoind, 'kinvey')
      .then(res => {
        observer.trigger(observer.events.loginUser, res.username)
        observer.trigger(observer.events.notification, { status: 'success', message: 'Success' })
        this.props.history.push('/ads')
      })
      .catch(res =>
        observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error }))
  }

  render = () => {
    return (null)
  }
}