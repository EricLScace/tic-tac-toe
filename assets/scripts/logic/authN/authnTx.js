'use strict'
// const authnAPIrx = require('./authnAPIrx')
// const authnAPItx = require('./authnAPItx')
const authnUItx = require('./authnUItx')

// Log in the player
const logIn = function (objProferredCredentials) {
  console.log('playerAuthnTx: logIn', objProferredCredentials)
  // // Post note to user...
  // authnUItx.announceLoggingIn()
  // // Request log-in from server via API
  // authnAPItx.logIn(objProferredCredentials)
  //   .then(authnAPIrx.rxLogInOK)
  //   .catch(authnAPIrx.rxLogInFail)
}

const readyToLogInRegister = function () {
  console.log('playerAuthnTx: readyToLogInRegister')
  authnUItx.solicitingLogInRegister()
}

// const readyToLogOut = function () {
//   // Game in progress, if any, was saved.
//   console.log('playerAuthnTx: readyToLogOut')
//   // Inform player that she is being logged out
//   authnUItx.loggingOutPlayer()
//   // Ask server to log out player
//   authnAPItx.logOut()
// }

module.exports = {
  logIn,
  readyToLogInRegister
  // readyToLogOut
}
