import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import requester from '../infrastructure/requester';
import Navigation from '../common/Navigation';

export default class Ad extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ads: []
        }
    }

    username = sessionStorage.getItem('publisher')
    endpoint = 'adverts/?query={"publisher":"'+sessionStorage.getItem('publisher')+'"}'

    getAds = () => {
        requester.get('appdata', this.endpoint, 'kinvey')
        .then(res => {
            this.setState({ ads: res})
        })
    }
   
    componentDidMount = () => this.getAds()
   
    render = () => {
        return(
            <div>
                <Navigation />.
                <div className="private_list" >
                    {/* <h2>Your List</h2> */}
                    <ul className='private_ul'>
                    <h2>Your List</h2>
                       {this.state.ads.length ? (this.state.ads.map((p, i) => <li key={i} data-id={p._id}>{i+1}. {p.title} <Link to={'/edit/'+p._id} >edit</Link></li>)) : 'is empty'}
                        {/* {this.state.ads.map((p, i) => <li data-id={p._id}>{i+1}. {p.title} <Link to={'/edit/'+p._id} >edit</Link></li>) } */}
                    </ul>
                
                        
                </div>
            </div> 
        )
    }
}