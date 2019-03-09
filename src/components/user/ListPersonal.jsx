import React, { Component } from 'react'
import requester from '../infrastructure/requester'
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

  content = () => {
    if (this.state.ads.length === 0) {
      return <div>You have 0 comics</div>
    } else {
      return (
        <div id='add_list'>
          <h2>List of your items:</h2>
          <ul>
            {this.state.ads.length > 0 ? this.state.ads.map((p, i) => <SingleItem key={p._id} index={i} {...p} isAdm={this.isAdm} />) :
              <Spin size="large" id='spinner_m' />}
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
