import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import observer from '../infrastructure/observer'

export default class Navigation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isAdm: false
    }
    observer.subscribe(observer.events.isAdmin, this.checkAdmin)
  }

  checkAdmin = (isAdm) => {
    this.setState({ isAdm })
  }

  adminNav = () => {
    if (this.state.isAdm) return <NavLink className="nav" to='/all-items' exact activeClassName='active' style={{ textDecoration: 'none' }}>All items</NavLink>
    else return <NavLink className="nav" to='/personal' exact activeClassName='active' style={{ textDecoration: 'none' }}>My Items</NavLink>
  }

  navPlug = () => {
    if (sessionStorage.getItem('authtoken')) {
      return (
        <div id="menu">
          <Nav>
            <NavLink className="nav" to='/ads' exact activeClassName='active' style={{ textDecoration: 'none' }}>All Comics</NavLink>
            <NavLink className="nav" to='/create' exact activeClassName='active' style={{ textDecoration: 'none' }}>Add New</NavLink>
            {/* <NavLink className="nav" to='/personal' exact activeClassName='active' style={{ textDecoration: 'none' }}>My Items</NavLink> */}
            {this.adminNav()}
          </Nav>
        </div>
      )
    } else {
      return null
    }
  }

  render = () => {
    return (
      this.navPlug()
    )
  }
}