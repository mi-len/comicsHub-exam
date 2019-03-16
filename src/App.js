import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './styles/styles-m.css'
import Home from './components/home/Home'
import Header from './components/common/Header'
import Notification from './components/common/Notification'
import Logout from './components/user/auth/Logout'
import AdsList from './components/ads/AdsList'
import EditAd from './components/ads/modifiers/EditAd'
import NotFound from './components/home/NotFound'
import CreateAd from './components/ads/modifiers/CreateAd'
import Details from './components/ads/modifiers/Details'
import Delete from './components/ads/modifiers/Delete'
import ListPersonal from './components/user/ListPersonal'
import ListItems from './components/user/admin/ListItems'
import UserPage from './components/user/UserPage'
import Marvel from './components/external/Marvel'
import { Affix } from 'antd';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    sessionStorage.getItem('authtoken')
      ? <Component {...props} />
      : <Redirect to='/' />
  )}/>
)

class App extends Component {

  state = {
    top: 0,
    bottom: 0,
  }

  render() {
    return (
      <div className='App'>
        <Affix offsetTop={this.state.top}>
          <Header />
        </Affix>
        <div className='content_container'>
          <Notification className='notif_module' />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/logout' component={Logout} />
            <Route path='/marvel' component={Marvel} />
            <PrivateRoute path='/ads' component={AdsList} />
            <PrivateRoute path='/edit/:id' component={EditAd} />
            <PrivateRoute path='/create' component={CreateAd} />
            <PrivateRoute path='/details/:id' component={Details} />
            <PrivateRoute path='/delete/:id' component={Delete} />
            <PrivateRoute path='/personal/' component={ListPersonal} />
            <PrivateRoute path='/all-items/' component={ListItems} />
            <PrivateRoute path='/user/:publisher' component={UserPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
