'use strict'
const authLogIn = require('./logic/authLogIn')
const config = require('./config')
const setAPIOrigin = require('../../lib/set-api-origin')

// Wait for document to be ready
$(() => {
  setAPIOrigin(location, config)

  // Insert Tic-tac-toe heading
  $('.game-title').html('<h1>Tic Tac Toe</h1>')

  // Load player's log-in/registration forms into UI
  authLogIn.addLogInRegister()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
