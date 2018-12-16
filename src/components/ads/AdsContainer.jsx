import React, { Component } from 'react'
import Navigation from '../common/Navigation';
import AdsList from './AdsList';
import '../../styles/styles.css'

export default class AdsContainer extends Component {
    render = () => {
        return(
            <div className='block_el'>
                <Navigation className='nav_'/>.
                <div className='site-content'>
                    <div id='all-ads' >
                        <AdsList renderContainerState={this.renderContainerStateTrigger}/>
                    </div>
                </div>
            </div>
        )
    }
}