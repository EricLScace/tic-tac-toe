'use strict'
const authnAPItx = require('./authnAPItx')
const authnUItx = require('./authnUItx')

const authEvents = require('../auth-ev')
const signInRegisterTemplate = require('../../templates/signInRegister.handlebars')

const readyToLogInRegister = function () {
  // Insert Tic-tac-toe heading
  $('.game-title').html('<h1>Tic Tac Toe</h1>')

  // Load player's log-in/registration forms into UI
  // Wait for the load to complete before continuing (synchronous, but
  // needed to be sure form is ready to fire event).
  const signInRegisterHtml = signInRegisterTemplate()
  $('#player').html(signInRegisterHtml)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-up').on('submit', authEvents.onSignUp)
}

const readyToLogOut = function () {
  // Game in progress, if any, was saved.
  console.log('playerAuthnTx: readyToLogOut')
  // Inform player that she is being logged out
  authnUItx.loggingOutPlayer()
  // Ask server to log out player
  authnAPItx.logOut()
}

module.exports = {
  readyToLogInRegister,
  readyToLogOut
}
