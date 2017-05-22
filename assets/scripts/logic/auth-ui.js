'use strict'

const objGameEvents = require('./game-ev')
const objPlayer = require('../objects/player')

const signInSuccess = function (objResponse) {
  // API returns an object of form
  // {
  //   user: {
  //     email: "string",
  //     id: int,
  //     token: "string"
  //   }
  // }

  // Remove event handlers?
  // $('#sign-in').off('submit')
  // $('#sign-up').off('submit')

  // Save player credentials
  objPlayer.fnIsLoggedIn(true,
    objResponse.user.email,
    objResponse.user.id,
    objResponse.user.token)

  // Load player space on screen
  $('#player').load('assets/scripts/templates/player.handlebars', function () {
    // When load completes, insert logged-in user name
    $('.player-name').html(objPlayer.name + ' logged in.')
  })

  // Load & start new game
  objGameEvents.onNewGame()
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
