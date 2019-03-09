import React, { Component } from 'react'
import '../../styles/styles-m.css'
import requester from '../infrastructure/requester'
import Ad from './Ad'
import { Spin } from 'antd';
import observer from '../infrastructure/observer'

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

  checkAdmin = (isAdm) => {
    this.setState({ isAdm })
  }

  componentDidMount = () => this.getAds()

  render = () => {
    return (
      <div>
        <div className='flex-container ads'>
          {this.state.ads.length > 0 ?
            this.state.ads.map((p, i) => <Ad key={p._id} index={i} {...p} isAdm={this.state.isAdm} />) :
            <Spin size="large" id='spinner_m' />}
        </div>
      </div>
    )
  }
}