import React, { Component } from 'react'
import requester from '../infrastructure/requester'
// import '../../styles/styles.css'
import { Spin } from 'antd';
import SingleItem from './SingleItem'

export default class UserPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ads: [],
      count: 0
    }
    this.publisher = this.props.match.params.publisher
  }

  getAds = () => {
    requester.getPersonal('appdata', 'adverts', 'kinvey', this.publisher)
      .then(res => {
        this.setState({
          ads: res,
          count: res.length
        })
      })
  }

  componentDidMount = () => {
    this.getAds()
  }

  content = () => {
    if (this.state.ads.length === 0) {
      return <div>{this.publisher} have 0 comics</div>
    } else {
      return (
        <div id='add_list'>
          <div className='userP_profile'>
            <span>User <span className='userP_name'>{this.publisher}</span></span>
            <div>contact: {this.state.ads[0].phone}</div>
            <div>items: <span className='userP_items'>{this.state.count}</span></div>
          </div>

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