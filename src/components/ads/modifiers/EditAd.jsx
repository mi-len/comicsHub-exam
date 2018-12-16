import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import requester from '../../infrastructure/requester'
import Navigation from '../../common/Navigation';

export default class EditAd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            publisher: sessionStorage.getItem('publisher'),
            title: '',
            img_url: '',
            description: '',
            price: '',
            id: this.props.id
        }
    }

    idd = this.props.match.params.id

    componentDidMount = () => {
            
            requester.get('appdata', 'adverts/' + this.idd, 'kinvey')
            .then(res => {
                this.setState({
                    title: res.title,
                    description: res.description,
                    price: res.price,
                    phone: res.phone,
                    id: res._id,
                    img_url: res.img_url
            }).then(() => console.log('inside then'))
            })
            .catch(res => 
                observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error}) )
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
        
        requester.update('appdata', 'adverts/' + this.idd, 'kinvey', this.state)
            .then(res => {
                observer.trigger(observer.events.loginUser, res.username)
                observer.trigger(observer.events.notification, { status: 'success', message: 'Success'})
                this.props.history.push('/ads')   
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
                    <h2>Edit Ad</h2>
                    <label>Title:</label>
                    <input name="title" onChange={this.handleChange} type="text" value={this.state.title}/>
                    <label>Image url:</label>
                    <input name="img_url" onChange={this.handleChange} type="text" value={this.state.img_url}/>
                    <label>Price:</label>
                    <input name="price" onChange={this.handleChange} type="number" min="1" step="any" value={this.state.price}/>
                    <label>Your phone:</label>
                    <input name="phone" onChange={this.handleChange} type="number" value={this.state.phone}/>
                    <label>Description:</label>
                    <textarea name="description" onChange={this.handleChange} type="text" value={this.state.description}/>
                    <input id="btnCreateAd" value="Submit changes" type="submit" />
                </form>
          </div>
        )
    }
}