import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default class Ad extends Component {

  deleteComics = () => {
    const id = this.props._id
    this.props.deleteItem(id, this.props.title);            
  } 

  validOwner = () => {
    if (this.props._acl.creator === sessionStorage.getItem('id') || this.props.isAdm) {
      return (
        <span>
          <Link to={'/edit/' + this.props._id} data-toggle="tooltip" data-placement="right" title="Edit Ad">
            <i className="far fa-edit card_edit_i"></i>
          </Link>
          <span onClick={this.deleteComics} data-toggle="tooltip" data-placement="right" title="Delete Ad"><i className="far fa-trash-alt"></i></span>
          {/* <Link to={'/delete/' + this.props._id} data-toggle="tooltip" data-placement="right" title="Delete Ad" >
            <i className="far fa-trash-alt"></i>
          </Link> */}
        </span>
      )
    } else {
      return null
    }
  }

  render = () => {
    return (

      <Card className='card_c'>
        <Link to={'details/' + this.props._id}>
          <Card.Img
            variant="top"
            src={this.props.img_url ?
              this.props.img_url :
              'https://www.pickeringtest.com/themes/shared/common/images/placeholder.png'}
            className='card_thumb'
          />
        </Link>
        <Card.Body className='card_body'>
          <Card.Title className='card_title'>{this.props.title}</Card.Title>
          <div className="card_text_c">
            <Card.Subtitle className='card_subTitle'>
              <em>by</em> <span className='card_publisher'>{this.props.publisher}</span>
            </Card.Subtitle>
            <div>
              <hr />
              <Card.Text className='card_price'>
                price: <span className='price_num'>
                  {(this.props.price || this.props.price === 0) ?
                    <span>{this.props.price} <i className="fas fa-euro-sign"></i></span> :
                    'free'}</span>
              </Card.Text>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted card_footer">
          <Link to={'details/' + this.props._id}>
            {/* <i class="far fa-eye"></i> */}
            View details
          </Link>
          {this.validOwner()}
        </Card.Footer>
      </Card>
    )
  }
}