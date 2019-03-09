import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Popover } from 'antd';

export default class SingleItem extends Component {

  render = () => {
    const content = (
      <div className='admSingle_thumbnail'>
        <img src={this.props.img_url} alt="cover" />
      </div>
    )

    return (

      <li className='single_c container'>
        <Popover content={content}>
          <span className='single_left'>
            <span className='single_num'>{this.props.index + 1}</span>
            {this.props.title}
          </span>
        </Popover>

        <span className='single_right'>
          <Link to={'/details/' + this.props._id} data-toggle="tooltip" data-placement="right" title="View Details">
            <i className="far fa-eye"></i>
            {/* View details */}
          </Link>
          <Link to={'/edit/' + this.props._id} data-toggle="tooltip" data-placement="right" title="Edit Ad">
            <i className="far fa-edit"></i>
          </Link>
          <Link to={'/delete/' + this.props._id} data-toggle="tooltip" data-placement="right" title="Delete Ad" >
            <i className="far fa-trash-alt"></i>
          </Link>
        </span>
      </li>
    )
  }
}