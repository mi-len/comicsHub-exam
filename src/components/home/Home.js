import React, { Component } from 'react'
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
// import '../../styles/styles.css'
// import observer from '../infrastructure/observer'

export default class Home extends Component {
    render = () => {
        return(
            <div className="Site">
                <div id='container' className='site-content'> 
                    <LoginForm {...this.props}/>
                    <RegisterForm {...this.props}/>
                </div>
            </div>
        )
    }
}