import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import requester from '../../infrastructure/requester'

export default class SingleUser extends Component {

  render = () => {
    return (

      <li className='single_c container'>
        <span className='single_left'>
          <span className='single_num'>{this.props.index + 1}</span>
          {this.props.username} 
        </span>
        <span className='user_mail'>{this.props.email}</span>
        <span className='single_right'>
          {this.props.isAdmin ? <span>Admin</span> : null}
        </span>

      </li>

    )
  }


}