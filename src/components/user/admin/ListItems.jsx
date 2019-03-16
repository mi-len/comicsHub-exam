import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import { Spin } from 'antd';
import SingleAdmItem from './SingleAdmItem'
import { BackTop } from 'antd';

export default class ListItems extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ads: []
    }
  }

  getAds = () => {
    requester.get('appdata', 'adverts', 'kinvey')
      .then(res => {
        this.setState({ ads: res })
      })
  }

  componentDidMount = () => {
    this.getAds()
    window.scrollTo(0, 0)
  }

  content = () => {
    return (
      <div id='add_list'>
        <h2>List of all Items:</h2>
        <ul>
          {this.state.ads.length > 0 ? this.state.ads.map((p, i) => <SingleAdmItem key={p._id} index={i} {...p} />) :
            <Spin size="large" id='spinner_m' />}
        </ul>
        <BackTop />
      </div>)
  }

  render = () => {
    return (
      this.content()
    )
  }
}
