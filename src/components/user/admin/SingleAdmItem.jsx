import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Popover } from 'antd';

export default class SingleAdmItem extends Component {

  render = () => {
    const content = (
      <div className='admSingle_thumbnail'>
        <img src={this.props.img_url} alt="cover"/>
      </div>
    );

    return (
      <li className='row single_c'>
      <Popover content={content}>
        <span className='col-7'>
          <span className='single_num'>{this.props.index + 1}</span>
          {this.props.title}
        </span>
      </Popover>
      <Link className='col-2' to={'user/' + this.props.publisher}>by {this.props.publisher}</Link>

      <span className='col-2 adm_single_i'>
        <Link to={'details/' + this.props._id}  data-toggle="tooltip" data-placement="right" title="View Details">
          <i className="far fa-eye"></i>
        </Link>
        <Link to={'/delete/' + this.props._id} data-toggle="tooltip" data-placement="right" title="Delete Ad" >
          <i className="far fa-trash-alt"></i>
        </Link>
      </span>
    </li>
    )
  }
}