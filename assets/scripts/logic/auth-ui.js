'use strict'

const api = require('./auth-api')
const objGameEvents = require('./game-ev')
const objPlayer = require('../objects/player')
const playerTemplate = require('../templates/player.handlebars')

const signInSuccess = function (objResponse) {
  // API returns an object of form
  // {
  //   user: {
  //     email: "string",
  //     id: int,
  //     token: "string"
  //   }
  // }

  // Save player credentials
  objPlayer.fnIsLoggedIn(true,
    objResponse.user.email,
    objResponse.user.id,
    objResponse.user.token)

  // Load player space on screen
  const playerHtml = playerTemplate()
  $('#player').html(playerHtml)
  // When load completes, insert logged-in user name
  $('#player-name').html(objPlayer.name + ' logged in.')
  // Add log-out button & event handler
  $('#player-actions').html('<input type="button" id="log-out-button" value="Log out">')
  console.log(onLogOut)
  $('#log-out-button').on('click', onLogOut)

  // Load & start new game
  objGameEvents.onNewGame()
}

const onLogOut = function (e) {
  // e.preventDefault()
  // $('#announcement').html('Logging out…')
  // // Store the game at the server, if one was in progess.
  // // Clear game grid
  // // Remove grid's event handler
  // $('#grid').off('click')
  console.log('auth-ui onLogOut', api.objUserAuthNToken)
//   api.signOut()
//     .then(ui.signOutSuccess)
//     .catch(ui.signOutFailure)
}

const signInFailure = function (objResponse) {
  // API returns a 401 (Unauthorized) failure with object containing:
  // statusText: "Unauthorized"
  $('#announcement').html('<br>Name or password not recognized. Try again, or re-register.')
}

// const signOutSuccess = function (objResponse) {
//   // API returns undefined.
// }
//
// const signOutFailure = function (objResponse) {
//   // Usually this is a token value problem.
// }

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

module.exports = {
  // changePasswordSuccess,
  // changePasswordFailure,
  signInSuccess,
  signInFailure,
  // signOutSuccess,
  // signOutFailure,
  signUpSuccess,
  signUpFailure
}
