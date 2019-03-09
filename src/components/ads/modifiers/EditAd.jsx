import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import requester from '../../infrastructure/requester'
import { Input } from 'antd';
import 'antd/dist/antd.css'

export default class EditAd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      publisher: sessionStorage.getItem('publisher'),
      title: '',
      img_url: '',
      description: '',
      price: '',
      id: this.props.id,
      phone: ''
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
        }).then(() => console.log('inside then eee'))
      })
      .catch(res =>
        observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error }))
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
        observer.trigger(observer.events.notification, { status: 'success', message: 'Success' })
        this.props.history.push('/ads')
      })
      .catch(res =>
        observer.trigger(observer.events.notification, { status: 'error', message: res.responseJSON.error }))
  }

  render = () => {
    return (
      <div className='container'>
        <h2>Edit item info:</h2>
        <div className='row'>

          <div className="col-7">
            <form id="createAdForm" onSubmit={this.handleSubmit}>
              <div className='error_msg'>{this.state.error}</div>
              <label>Title:</label>
              <input className="ant-input" name="title" onChange={this.handleChange} type="text" value={this.state.title} />
              <label>Image url:</label>
              <input className="ant-input" name="img_url" onChange={this.handleChange} type="text" value={this.state.img_url} />
              <label>Price:</label>
              <input className="ant-input" name="price" onChange={this.handleChange} type="number" min="1" step="any" value={this.state.price} />
              <label>Your phone:</label>
              <input className="ant-input" name="phone" onChange={this.handleChange} type="number" value={this.state.phone} />
              <label>Description:</label>
              <textarea className="ant-input" name="description" onChange={this.handleChange} type="text" value={this.state.description} />
              <Input id="btnCreateAd" value="Submit changes" type="submit" />
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