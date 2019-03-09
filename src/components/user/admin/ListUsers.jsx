import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import { Spin } from 'antd';
import SingleUser from './SingleUser';

export default class ListUsers extends Component {

  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }

  getAllUsers = () => {
    console.log('getAllUser start');

    requester.getUsers('Kinvey')
      .then(res => {
        console.log('list all res', res);
        this.setState({ users: res })
      })
  }

  componentDidMount = () => {
    this.getAllUsers()
  }

  render = () => {

    return (

      <div className='all_users_c'>
        <h2>List of all Users:</h2>
        <ul>
          {this.state.users.length > 0 ? this.state.users.map((p, i) => <SingleUser key={p._id} index={i} {...p} />) :
            <Spin size="large" id='spinner_m' />}
        </ul>
      </div>
    )
  }
}
