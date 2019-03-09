import React from 'react'
import ReactDOM from 'react-dom'
// import { firebaseApp } from './firebase'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// firebaseApp.auth().onAuthStateChanged(user => {
//   if (user) {
//     console.log('user in', user)
//   } else {
//     console.log('no user')
    
//   }
// })

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
