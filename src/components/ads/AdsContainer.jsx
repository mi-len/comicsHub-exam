import React, { Component } from 'react'
import AdsList from './AdsList';
import '../../styles/styles-m.css'
import { BackTop } from 'antd';

export default class AdsContainer extends Component {
  render = () => {
    return (
      <div className='block_el'>
        <div className='site-content'>
          <div id='all-ads' >
            <AdsList renderContainerState={this.renderContainerStateTrigger} />
          </div>
        </div>
        <div>
          <BackTop />
        </div>
      </div>
    )
  }
}