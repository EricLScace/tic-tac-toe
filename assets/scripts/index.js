'use strict'
const config = require('./config')
const playerAuthnTx = require('./logic/authN/playerAuthnTx')
const setAPIOrigin = require('../../lib/set-api-origin')

// Wait for document to be ready
$(() => {
  setAPIOrigin(location, config)
  // kick off by asking for log-in or registration
  playerAuthnTx.readyToLogInRegister()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
