import React, { Component } from 'react'
import observer from '../infrastructure/observer'
import { Link } from 'react-router-dom'

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
        const loggedInSection =
            <div id="profile">
                {/* <span id='username'>user: {this.state.username}</span> */}
                <span id='username'>{sessionStorage.getItem('publisher')}</span>

                <Link to='/logout'><img id='logout_icon' src="http://www.web.remindzapp.com/images/common/793c9824.logout.png" alt="logout"/></Link>
                {/* <Link to='/logout'><span id='btnLogout'>logout</span></Link> */}
            </div>

        return (
            <header>
                {/* <Link className='logo-link' to='/'> */}
                    <span className="logo">
                        <img src="http://code.ellefu.eu/wp-content/uploads/2018/07/megaph.png" alt="logo"/>
                    </span>
                    <span className="header">Comicshub</span>
                {sessionStorage.getItem('authtoken') ? loggedInSection : null}
                {/* </Link> */}
            </header>
        )
    }
}