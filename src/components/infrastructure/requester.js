import $ from 'jquery'
const kinveyBaseUrl = 'https://baas.kinvey.com/'
const kinveyAppKey = 'kid_Bki9j4gcM'
const kinveyAppSecret = '5f14ca958c5441e59977487acab7dba5'

// Creates the authentication header
function makeAuth (type) {
  return type === 'basic'
    ? 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
    : 'Kinvey ' + sessionStorage.getItem('authtoken')
}

// Creates request object to kinvey
function makeRequest (method, module, endpoint, auth) {
  return {
    method,
    url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
    headers: {
      'Authorization': makeAuth(auth)
    }
  }
}

// Creates request object to kinvey with query / user
function makeRequestWithQuery (method, module, endpoint, auth, publisher) {
  return {
    method,
    url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint + '/' + `?query={"publisher":"${publisher}"}`,
    headers: {
      'Authorization': makeAuth(auth)
    }
  }
}

// Function to return GET promise
function get (module, endpoint, auth) {
  return $.ajax(makeRequest('GET', module, endpoint, auth))
}

// Function to return list of personal items
function getPersonal (module, endpoint, auth, publisher) {
  return $.ajax(makeRequestWithQuery('GET', module, endpoint, auth, publisher))
}

// Function to return POST promise
function post (module, endpoint, auth, data) {
  let req = makeRequest('POST', module, endpoint, auth)
  req.data = data
  return $.ajax(req)
}

// Function to return PUT promise
function update (module, endpoint, auth, data) {
  let req = makeRequest('PUT', module, endpoint, auth)
  req.data = data
  return $.ajax(req)
}

// Function to return DELETE promise
function remove (module, endpoint, auth) {
  return $.ajax(makeRequest('DELETE', module, endpoint, auth))
}

// Creates request to Users
function makeUserRequest (method, auth) {
  return {
    method,
    url: kinveyBaseUrl + 'user' + '/' + kinveyAppKey,
    headers: {
      'Authorization': makeAuth(auth)
    }
  }
}

// Function to return GET All Users
function getUsers (auth) {
  return $.ajax(makeUserRequest('GET', auth))
}

export default {
  getUsers,
  getPersonal,
  get,
  post,
  update,
  remove
}
