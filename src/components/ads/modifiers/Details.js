import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import requester from '../../infrastructure/requester'

export default class Details extends Component {

  constructor(props) {
    super(props)

    this.state = {
      publisher: '',
      title: '',
      img_url: '',
      description: '',
      price: '',
      id: ''
    }
  }

  idd = this.props.match.params.id

  componentDidMount = () => {

    window.scrollTo(0, 0)
    
    requester.get('appdata', 'adverts/' + this.idd, 'kinvey')
      .then(res => {
        // console.log('details res', res);
        this.setState({
          title: res.title,
          description: res.description,
          price: res.price,
          id: res._id,
          img_url: res.img_url,
          phone: res.phone,
          publisher: res.publisher,
          item: res
        })
      })
      .catch(res =>
        observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error }))
  }

  render = () => {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-5'>
            <img className='details_img' src={this.state.img_url} alt="" />
          </div>
          <div className='col-7'>
            <h1>{this.state.title}</h1>
            <div>
              <div className='card_price'>
                price:  
                <span className='price_num details_price_num'>
                  {this.state.price 
                    ? <span><span className='details_price_num'>{this.state.price}</span> <i className="fas fa-euro-sign"></i></span>
                    : 'free'}
                </span>
              </div>
              <div className='details_contact'>
                <span className='details_publisher'>
                  published by:
                </span> {this.state.publisher}
                <div className='details_publisher'>
                  {this.state.phone 
                    ? 'contact: ' + this.state.phone 
                    : null}
                </div>
              </div>
              <hr />
              <div className='details_descr'>{this.state.description}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}