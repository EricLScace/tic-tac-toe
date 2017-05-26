'use strict'
const authnTx = require('./authnTx')
// const gameController = require('../game/gameController')

// User submitted log-in form
const logInRequested = function (objProferredCredentials) {
  console.log('playerAuthnRx: logInRequested', objProferredCredentials)
  // Log-in form validation checks
  // If OK, ask playerAuthnTx to log in User
  authnTx.xxx(objProferredCredentials)
}

// User clicked to log-out
// const logOutRequested = function () {
//   console.log('playerAuthnRx: logOutRequested')
//   // Pass request to gameController first.
//   // If a game is in progress, it should be saved first before log-out starts.
//   gameController.logOutRequested()
  // $('#announcement').html('Logging out…')
  // Remove the log-out click handler and button

  // // Store the game at the server, if one was in progess.
  // // Clear game grid
  // // Remove grid's event handler
  // $('#grid').off('click')
  //   api.signOut()
  //     .then(ui.signOutSuccess)
  //     .catch(ui.signOutFailure)
// }

module.exports = {
  logInRequested
  // logOutRequested
}
