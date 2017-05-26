'use strict'
// Invoked by API responses & UI actions
const api = require('./auth-api')
const authLogOut = require('./authLogOut')
const getFormFields = require('../../../lib/get-form-fields')
const objGameEvents = require('./game-ev')
const Player = require('../objects/player')
const playerTemplate = require('../templates/player.handlebars')
// const signInRegisterTemplate = require('../templates/signInRegister.handlebars')
const store = require('../store')

//
// const onChangePassword = function (event) {
//   event.preventDefault()
//   const objPasswordsOldNew = getFormFields(event.target)
//   console.log('Event onChangePassword invoked with data', objPasswordsOldNew)
//   console.log('and on objUserAuthNToken', api.objUserAuthNToken)
//   api.changePassword(objPasswordsOldNew)
//     .then(ui.changePasswordSuccess)
//     .catch(ui.changePasswordFailure)
// }

// Log-in functions
// const addLogInRegister = function () {
//   $('#player').html(signInRegisterTemplate())
//   $('#sign-in').on('submit', onLogIn)
//   $('#sign-up').on('submit', onSignUp)
// }

const onLogIn = function (e) {
  e.preventDefault()
  const objProfferedCredentials = getFormFields(e.target)
  // If there are no cached credentials, create them
  if (!store.objPlayer) {
    const objPlayer = new Player(null, // not logged in yet
      objProfferedCredentials.credentials.email,
      null, // no ID
      null, // no token
      objProfferedCredentials.credentials.password)
    // Cache credentials in store
    store.objPlayer = objPlayer
  }
  api.signIn(objProfferedCredentials)
    .then(logInSuccess)
    .catch(logInFailure)
}

const logInSuccess = function (objResponse) {
  // API returns an object of form
  // {
  //   user: {
  //     email: "string",
  //     id: int,
  //     token: "string"
  //   }
  // }

  // Update player credentials
  store.objPlayer.setLogInStatus(true, // logged in
    objResponse.user.email,
    objResponse.user.id,
    objResponse.user.token)

  // Load player space on screen
  const playerHtml = playerTemplate()
  $('#player').html(playerHtml)
  // When load completes, insert logged-in user name
  $('#player-name').html(store.objPlayer.name + ' logged in.')
  // Add log-out button & event handler
  $('#player-actions').html('<input type="button" id="log-out-button" value="Log out">')
  $('#log-out-button').on('click', authLogOut.onLogOut)

  // Load & start new game
  objGameEvents.onNewGame()
}

const logInFailure = function (objResponse) {
  // API returns a 401 (Unauthorized) failure with object containing:
  // statusText: "Unauthorized"
  $('#announcement').html('<br>Name or password not recognized. Try again, or re-register.')
}

// Log out functions
// const onLogOut = function (e) {
//   e.preventDefault()
//   // // Store the game at the server, if one was in progess.
//   // // Clear game grid & remove its click handler
//   $('#grid').html('')
//   $('#grid').off('click')
//   $('#announcement').html('Logging out…')
//   api.signOut()
//     .then(logOutSuccess)
//     .catch(logOutFailure)
// }
//
// const logOutSuccess = function (objResponse) {
//   $('#announcement').html('')
//   addLogInRegister()
// }
//
// const logOutFailure = function (objResponse) {
//   // Usually this is a token value problem.
// }

const onSignUp = function (e) {
  // event.target must be an HTML form
  // prefer coding 'event.target' rather than 'this'

  // ALWAYS preventDefault first!
  e.preventDefault()

  // Save player's proffered credentials
  const objProfferedCredentials = getFormFields(e.target)
  const objPlayer = new Player(null, // not logged in yet
    objProfferedCredentials.credentials.email,
    null, // no ID
    null, // no token
    objProfferedCredentials.credentials.password)

  // Cache credentials in store
  store.objPlayer = objPlayer

  // use AJAX to initiate HTTP request, defined in api module, for sign-up
  api.signUp(objProfferedCredentials)
    // Promise .then waits for the async operation
    // Mandatory to avoid race conditions introduced by network delays
    .then(signUpSuccess)
    // subsequent .then will pass the return from the previous .then as the
    // first argument to the callback function.
    .catch(signUpFailure)
}

const signUpSuccess = function (objResponse) {
  // API returns an object of form
  // {
  //   user: {
  //     email: "string",
  //     id: int
  //   }
  // }

  // Remove event handlers
  // $('#sign-in').off('submit')
  // $('#sign-up').off('submit')

  // Re-init the registration form fields

  // Display welcome announcement.
  $('#announcement').html('Welcome, ' +
    objResponse.user.email +
    '. Please log in or register another user.')
}

const signUpFailure = function (objResponse) {
  // API returns an JSON containing one useful key-value pair:
  // responseText: {
  //   "email":["has already been taken"]
  // }
  $('#player').html('Registration failed.')
}

//
// const changePasswordSuccess = function (objResponse) {
//   // API returns undefined.
// }
//
// const changePasswordFailure = function (objResponse) {
//   // Mostly likely failure scenario is wrong old password.
// }

module.exports = {onLogIn, onSignUp}
