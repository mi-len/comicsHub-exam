import React, { Component } from 'react'
import requester from '../infrastructure/requester'
import observer from '../infrastructure/observer'
import { Spin } from 'antd';
import SingleItem from './SingleItem'

export default class ListPersonal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ads: []
    }

    this.publisher = sessionStorage.getItem('publisher')
  }

  getAds = () => {
    requester.getPersonal('appdata', 'adverts', 'kinvey', this.publisher)
      .then(res => {
        this.setState({ ads: res })
      })
  }

  componentDidMount = () => {
    this.getAds()
  }

  deleteItem = (id, title) => {
    const endpoind = 'adverts/' + id
    requester.remove('appdata', endpoind, 'kinvey')
      .then(res => {
        observer.trigger(observer.events.notification, { status: 'success', message: "'" + title + "'" + ' deleted successful' })
        this.getAds()
      }).catch(res =>
        observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error }))
  }

  content = () => {
    if (this.state.ads.length === 0) {
      return <div>You have 0 comics</div>
    } else {
      return (
        <div id='add_list'>
          <h2>List of your items:</h2>
          <ul className='list_personal'>
            {this.state.ads.length > 0 ?
              this.state.ads.map((p, i) => <SingleItem className='li_personal' key={p._id} index={i} {...p} isAdm={this.isAdm} deleteItem={this.deleteItem} />) :
              <Spin size="large" id='spinner_m' />}
            <hr />
            Total items: {this.state.ads.length}
          </ul>
        </div>)
    }
  }

  render = () => {
    return (
      this.content()
    )
  }
}
