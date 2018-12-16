import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ValidOwnerCheck extends Component {
  constructor(props) {
    super(props) 
    
  }
  
    // if (this.props._acl.creator === sessionStorage.getItem('id') || this.props.isAdm === 1) {
    //     return( 
    //         <ul>
    //             <li className="action">
    //                 <Link className="editAd" to={'/edit/' + this.props._id}>edit</Link>
    //             </li>
    //             <li className="action">
    //                 <Link className="delAd" to={'/delete/' + this.props._id}>delete</Link>
    //             </li>
    //         </ul>
    //     ) 
    // } else {
    //    return null
    // }
  
}