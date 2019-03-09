import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import './styles/styles.css'
import Home from './components/home/Home'
import Header from './components/common/Header'
import Notification from './components/common/Notification'
import Logout from './components/user/Logout'
// import Footer from './components/common/footer';
import AdsContainer from './components/ads/AdsContainer'
import EditAd from './components/ads/modifiers/EditAd'
import NotFound from './components/home/NotFound'
import CreateAd from './components/ads/modifiers/CreateAd'
import Details from './components/ads/modifiers/Details'
import Delete from './components/ads/modifiers/Delete'
import ListPersonal from './components/user/ListPersonal'
import ListItems from './components/user/admin/ListItems'
import UserPage from './components/user/UserPage'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <div className='content_container'>
          <Notification className='notif_module' />
          {/* <Router> */}
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/logout' component={Logout} />
            <Route path='/ads' component={AdsContainer} />
            <Route path='/edit/:id' component={EditAd} />
            <Route path='/create' component={CreateAd} />
            <Route path='/details/:id' component={Details} />
            <Route path='/delete/:id' component={Delete} />
            <Route path='/personal/' component={ListPersonal} />
            <Route path='/all-items/' component={ListItems} />
            <Route path='/user/:publisher' component={UserPage} />
            <Route component={NotFound} />
          </Switch>

          {/* </Router> */}
          {/* <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/logout' component={Logout} />
            <Route path='/ads' component={AdsContainer} />
            <Route path='/edit/:id' component={EditAd} />
            <Route path='/create' component={CreateAd} />
            <Route path='/details/:id' component={Details} />
            <Route path='/delete/:id' component={Delete} />
            <Route component={NotFound} />
          </Switch> */}
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

export default App
