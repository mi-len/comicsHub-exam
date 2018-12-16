import React, { Component } from 'react'
import observer from '../infrastructure/observer';
// import '../styles/notifications.css'

const DEFAULT_STATE = {
            message: '',
            loading: '',
            status: ''
}

export default class Notification extends Component {
    constructor(props) {
        super(props)

        this.state = DEFAULT_STATE
        
        observer.subscribe(observer.events.notification, this.showNotification)
    }

    showNotification = (data) => {
        let message = data.message
        let status = data.status
        this.setState({ message: message})  
        this.setState({ status: status}) 
    } 

    hideNotification = ev => this.setState(DEFAULT_STATE)

    render = () => {
        let notificationId
        if (this.state.status === 'success') {
            notificationId = 'infoBox'
        } else if (this.state.status === 'error') {
            notificationId = 'errorBox'
        } else if (this.state.status === 'loading') {
            notificationId = 'loadingBox'
        }

        if(this.state.message) {
                 return (
                    <div id="notifications">
                         <div id={notificationId} className='notification'>
                            <span>{this.state.message}<button id='btn_close' onClick={this.hideNotification} >X</button></span>
                        </div>
                    </div>
                )
        } else {
            return null
        }
    }
}