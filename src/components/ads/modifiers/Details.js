import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import requester from '../../infrastructure/requester'
import Navigation from '../../common/Navigation'
import '../../../styles/styles.css'

export default class Details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            publisher: sessionStorage.getItem('publisher'),
            title: '',
            img_url: '',
            description: '',
            price: '',
            id: ''
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
                    id: res._id,
                    img_url: res.img_url,
                    phone: res.phone
                 })
            })
            .catch(res => 
                observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error}) )
    }

    render = () => {
        return(
            <div className='block_el'>
            <Navigation className='details_nav'/>  
                <div className='details_container'>
                    <h1>{this.state.title}</h1>
                    <img className='details_img' src={this.state.img_url} alt=""/>
                    <div className='details_info_box'>
                        <div className='details_descr'>{this.state.description}</div>
                        
                        <div className='details_price'>price: {this.state.price ? this.state.price : 'free'}</div>
                        <div><span className='details_publisher'>published by:</span> {this.state.publisher}</div>
                        <div className='details_publisher'>{this.state.phone ? 'contact: ' + this.state.phone : null }</div>
                    </div>
                   
                    {/* <div>id: {this.state.id}</div> */}
                </div>
            </div>
        )
    }
}