import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends Component {
  render = () => {
    return (
      <div className="not_found">
        <Link className='nf_backArrow' to='/ads'><i className="fas fa-chevron-left"></i> back</Link>
        <img src="http://ellefu.eu/images/comiscHub_r_sentinel_nf.png" alt="" />
      </div>
    )
  }
}