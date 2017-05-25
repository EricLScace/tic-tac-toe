'use strict'
const authEvents = require('../auth-ev')
const signInRegisterTemplate = require('../../templates/signInRegister.handlebars')

const loggingOutPlayer = function () {
  console.log('authnUItx: loggingOutPlayer')
}

// No one is logged in.
const solicitingLogInRegister = function () {
  // Insert Tic-tac-toe heading (in case this is start-up from scratch)
  $('.game-title').html('<h1>Tic Tac Toe</h1>')
  // Load player's log-in/registration forms into UI
  const signInRegisterHtml = signInRegisterTemplate()
  $('#player').html(signInRegisterHtml)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-up').on('submit', authEvents.onSignUp)
}

module.exports = {
  loggingOutPlayer,
  solicitingLogInRegister
}
