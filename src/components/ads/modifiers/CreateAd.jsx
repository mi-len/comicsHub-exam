import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import requester from '../../infrastructure/requester'
import Navigation from '../../common/Navigation'

export default class CreateAd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            publisher: sessionStorage.getItem('publisher'),
            title: '',
            img_url: '',
            description: '',
            price: 0,
            phone: '',
            error: ''
        }
    }

    handleChange = ev => {
        let fieldName = ev.target.name
        let fieldValue = ev.target.value

        this.setState({ [fieldName]: fieldValue  })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        if (this.state.title.length < 1) {
            this.setState({
                error: 'Title is missing!'
            })

            return
        } else if (this.state.title.length > 45) {
            this.setState({
                error: 'Title must be less than 45 symbols'
            })

            return
        } else if (this.state.phone.length < 1) {
            this.setState({
                error: 'Please enter your phone number!'
            })

            return
        } else {
            this.setState({
                error: ''
            })
        }

        requester.post('appdata', 'adverts', 'kinvey', this.state)
            .then(res => {
                observer.trigger(observer.events.loginUser, res.username)
                observer.trigger(observer.events.notification, { status: 'success', message: 'Success'})
                this.props.history.push('/ads') 
                // window.location.reload(); // tr drugo
            })
            .catch(res => 
                observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error}) )
    }

    render = () => {
        return(
            <div>
                <Navigation />
                <form id="createAdForm" onSubmit={this.handleSubmit}>
                <div className='error_msg'>{this.state.error}</div>
                    <h2>Create Ad</h2>
                    <label>Title:</label>
                    <input name="title" onChange={this.handleChange} type="text" />
                    <label>Image url:</label>
                    <input name="img_url" onChange={this.handleChange} type="text" />
                    <label>Price:</label>
                    <input name="price" onChange={this.handleChange} type="number" min="1" step="any" /><br/>
                    <label>Your phone:</label>
                    <input name="phone" onChange={this.handleChange} type="number" /><br/>
                    <label>Description:</label>
                    <textarea name="description" onChange={this.handleChange} type="text" />
                    <input id="btnCreateAd" value="Create" type="submit" />
                </form>
            </div>
        )
    }

}