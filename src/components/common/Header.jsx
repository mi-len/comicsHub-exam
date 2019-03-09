import React, { Component } from 'react'
import observer from '../infrastructure/observer'
import Navigation from './Navigation';
import Profile from './Profile'
import '../../styles/styles-m.css'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null
    }
    observer.subscribe(observer.events.loginUser, this.userLoggedIn2)
  }

  userLoggedIn2 = username =>
    this.setState({ username })

  render = () => {
    return (
      <header className='header_c'>

        <div className="logo">
          <img src="http://ellefu.eu/images/comicshub_back6.png" alt="logo" />
        </div>

        <div className='nav_c'>
          <Navigation></Navigation>
          <Profile></Profile>
        </div>

      </header>
    )
  }
}