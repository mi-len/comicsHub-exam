import React, { Component } from 'react'
import observer from '../infrastructure/observer'
import { Link } from 'react-router-dom'
// import '../../styles/styles-m.css'

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null
    }
    observer.subscribe(observer.events.loginUser, this.userLoggedIn)
  }

  userLoggedIn = username =>
    this.setState({ username })

  render = () => {
    const loggedInSection =
      <div className='profile_c'>
        {/* <span id='username'><span className='account_logas'>logged as:</span>{this.state.username}</span> */}
        <span className='profile_log'>logged as:</span><span className='profile_name'>{sessionStorage.getItem('publisher')}</span>
        <Link to='/logout' className='log_out_c'>
          <i className="fas fa-sign-out-alt"></i>
        </Link>
      </div>

    return (
      <div>
        {sessionStorage.getItem('authtoken') ? loggedInSection : null}
      </div>
    )
  }
}