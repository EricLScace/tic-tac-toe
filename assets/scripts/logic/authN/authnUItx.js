'use strict'
const authnUIrx = require('./authnUIrx')
const signInRegisterTemplate = require('../../templates/signInRegister.handlebars')

const announceLoggingIn = function () {
  $('#announcement').html('Logging in…')
}

// const loggingOutPlayer = function () {
//   console.log('authnUItx: loggingOutPlayer')
// }

// No one is logged in.
const solicitingLogInRegister = function () {
  // Insert Tic-tac-toe heading (in case this is start-up from scratch)
  $('.game-title').html('<h1>Tic Tac Toe</h1>')
  // Load player's log-in/registration forms into UI
  const signInRegisterHtml = signInRegisterTemplate()
  $('#player').html(signInRegisterHtml)
  authnUIrx.addLogInRegisterHandlers()
}

module.exports = {
  announceLoggingIn,
  // loggingOutPlayer,
  solicitingLogInRegister
}
