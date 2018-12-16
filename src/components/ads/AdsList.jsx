import React, { Component } from 'react'
import '../../styles/styles.css'
import requester from '../infrastructure/requester'
import Ad from './Ad'

export default class AdsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ads: []
        }
    }

    getAds = () => {
        requester.get('appdata', 'adverts', 'kinvey')
        .then(res => {
            this.setState({ ads: res})
        })
    }

    endpoint = sessionStorage.getItem('id')
    
    isAdm //store result for isAdmin from Kinvey
    getAdmin = () => {
        requester.get('user', this.endpoint, 'kinvey')
        .then(res => {
            if (res.isAdmin === true) { //assigned here
                this.isAdm = 1
            } else {
                this.isAdm = 0
            }
        }).then(this.getAds())
    }

    componentDidMount = () => this.getAdmin()

    render = () => {
        return(
           <div id='add_list'>
                <div className="ads" className='flex-container'>
                    {this.state.ads.map((p, i) => <Ad key={p._id} index={i} {...p} isAdm={this.isAdm}/>) }
                </div>
           </div>
        )
    }
}