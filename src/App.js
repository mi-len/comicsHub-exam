import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'

import './styles/styles.css';
import Home from './components/home/Home';
import Header from './components/common/Header';
import Notification from './components/common/Notification';
import Logout from './components/user/Logout'
// import Footer from './components/common/footer';
import AdsContainer from './components/ads/AdsContainer';
import EditAd from './components/ads/modifiers/EditAd';
import NotFound from './components/home/NotFound'
import CreateAd from './components/ads/modifiers/CreateAd';
import Details from './components/ads/modifiers/Details'
import Delete from './components/ads/modifiers/Delete'
import UserSpace from './components/home/UserSpace'

class App extends Component { 
 
  render() {
    return (
      <div className="App">
        <Header />
        <Notification />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/logout' component={Logout} />
          <Route path='/ads' component={AdsContainer} />
          <Route path='/edit/:id' component={EditAd} />
          <Route path='/create' component={CreateAd} />
          <Route path='/details/:id' component={Details} />
          <Route path='/delete/:id' component={Delete} />
          <Route path='/private/:id' component={UserSpace} />
          <Route component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
