'use strict'
const authnAPItx = require('./authnAPItx')
const authnUItx = require('./authnUItx')

const readyToLogOut = function () {
  // Game in progress, if any, was saved.
  console.log('playerAuthnTx: readyToLogOut')
  // Inform player that she is being logged out
  authnUItx.loggingOutPlayer()
  // Ask server to log out player
  authnAPItx.logOut()
}

module.exports = {
  readyToLogOut
}
