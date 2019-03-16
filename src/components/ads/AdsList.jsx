import React, { Component } from 'react'
import '../../styles/styles-m.css'
import requester from '../infrastructure/requester'
import Ad from './Ad'
import { Spin } from 'antd';
import observer from '../infrastructure/observer'
import { BackTop } from 'antd';

export default class AdsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ads: [],
      isAdm: false
    }
    observer.subscribe(observer.events.isAdmin, this.checkAdmin)
  }

  getAds = () => {
    requester.get('appdata', 'adverts', 'kinvey')
      .then(res => {
        this.setState({ ads: res })
      })
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

  checkAdmin = (isAdm) => {
    this.setState({ isAdm })
  }

  componentDidMount = () => {
    this.getAds()
    window.scrollTo(0, 0)
    // document.body.style = 'background: initial;'

  }

  render = () => {
    return (
      <div>
        <div className='flex-container ads'>
          {this.state.ads.length > 0 ?
            this.state.ads.map((p, i) => <Ad key={p._id} index={i} {...p} isAdm={this.state.isAdm} deleteItem={this.deleteItem} />) :
            <Spin size="large" id='spinner_m' />}
        </div>
        <BackTop />
      </div>
    )
  }
}