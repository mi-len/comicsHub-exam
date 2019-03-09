import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBoNrbnwtLoNuW5WZ_9RUJ7lK6M61Uk-nw',
  authDomain: 'comics-hub-57af7.firebaseapp.com',
  databaseURL: 'https://comics-hub-57af7.firebaseio.com',
  projectId: 'comics-hub-57af7',
  storageBucket: '',
  messagingSenderId: '636806906483'
}
export const firebaseApp = firebase.initializeApp(config)
