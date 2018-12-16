import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {

    navPlug = () => {
        if (sessionStorage.getItem('authtoken')) {
            return (
                <div id="menu">
                    <NavLink className="nav" to='/ads' exact activeClassName='active'>List</NavLink>
                    <NavLink className="nav" to='/create' exact activeClassName='active'>Create</NavLink>
                    <NavLink className="nav" to={'/private/'+sessionStorage.getItem('id')} exact activeClassName='active'>My ads</NavLink>

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