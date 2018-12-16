import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ValidOwnerCheck from '../home/ValidOwnerCheck'

export default class Ad extends Component {

    validOwner = () => {
        if (this.props._acl.creator === sessionStorage.getItem('id') || this.props.isAdm === 1) {
            return( 
                <ul>
                    <li className="action">
                        <Link className="editAd" to={'/edit/' + this.props._id}>edit</Link>
                    </li>
                    <li className="action">
                        <Link className="delAd" to={'/delete/' + this.props._id}>delete</Link>
                    </li>
                </ul>
            ) 
        } else {
           return null
        }
    }

    
    

    render = () => {
        return(
            <div className="ad" >
                <div className="title">
                    {this.props.title}
                </div>
                <div className='container'>
                    <div className='img_thumb'>
                        <img src={this.props.img_url ? this.props.img_url : 'https://www.pickeringtest.com/themes/shared/common/images/placeholder.png'} alt='thumbnail'/>
                    </div>
                    <div>
                        <div className="publisher">
                            by {this.props.publisher}
                        </div>
                        <div className='price_grid'>price: {this.props.price ? (this.props.price + ' lv') : 'free'}</div>
                        <div className="details">
                            <Link to={'details/' + this.props._id}>view details</Link>
                        </div>
                        <div className='del_edit'>
                           {this.validOwner()} 
                           {/* <ValidOwnerCheck /> */}
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}