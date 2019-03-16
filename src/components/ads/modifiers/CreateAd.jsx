import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import requester from '../../infrastructure/requester'
import 'antd/dist/antd.css'

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

    this.setState({ [fieldName]: fieldValue })
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
    } else if (this.state.phone.length < 6) {
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
        observer.trigger(observer.events.notification, { status: 'success', message: 'Success' })
        this.props.history.push('/ads')
      })
      .catch(res =>
        observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error }))
  }

  render = () => {
    return (
      <div className='container'>
        <h2>Ad new item:</h2>
        <div className="row">
          <div className="col-7">
            <form id="createAdForm" onSubmit={this.handleSubmit}>
              <div className='create_error_msg'>{this.state.error}</div>
              
              <label>Title*:</label>
              <input className="ant-input" name="title" onChange={this.handleChange} type="text" />
              <label>Image url:</label>
              <input className="ant-input" name="img_url" onChange={this.handleChange} type="text" />
              <label>Price:</label>
              <input className="ant-input" name="price" onChange={this.handleChange} type="number" min="1" step="any" /><br />
              <label>Your phone*:</label>
              <input className="ant-input" name="phone" onChange={this.handleChange} type="number" /><br />
              <p className="create_privacy">
                We'll never share your number with anyone else.
              </p>
              <label>Description:</label>
              <textarea className="ant-input" name="description" onChange={this.handleChange} type="text" />
              <input className="ant-input" id="btnCreateAd" value="Create" type="submit" />
            </form>          
          </div>
          <div className="col-5">
            <img className='details_img' src={this.state.img_url ?
                this.state.img_url :
                'https://www.pickeringtest.com/themes/shared/common/images/placeholder.png'} alt="" />
          </div>
        </div>
      </div>
    )
  }
}