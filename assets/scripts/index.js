'use strict'

const authEvents = require('./logic/auth-ev')
const config = require('./config')
const setAPIOrigin = require('../../lib/set-api-origin')
const signInRegisterTemplate = require('./templates/signInRegister.handlebars')

// Wait for document to be ready
$(() => {
  setAPIOrigin(location, config)

  // Insert Tic-tac-toe heading
  $('.game-title').html('<h1>Tic Tac Toe</h1>')

  // Load player's log-in/registration forms into UI
  // Wait for the load to complete before continuing (synchronous, but
  // needed to be sure form is ready to fire event).
  const signInRegisterHtml = signInRegisterTemplate()
  $('#player').html(signInRegisterHtml)
  authEvents.addLogInRegisterHandlers()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
