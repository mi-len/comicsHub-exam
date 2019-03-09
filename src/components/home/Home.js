import React, { Component } from 'react'
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
// import '../../styles/styles.css'
// import observer from '../infrastructure/observer'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container'

export default class Home extends Component {
  render = () => {
    return (
      <Container className='home_c'>
        <Tabs className="home-tabs-c" defaultActiveKey="login" id="uncontrolled-tab-example">
          <Tab eventKey="login" title="Login">
            <LoginForm {...this.props} />
          </Tab>
          <Tab eventKey="register" title="Register">
            <RegisterForm {...this.props} />
          </Tab>
        </Tabs>      
      </Container>
    )
  }
}