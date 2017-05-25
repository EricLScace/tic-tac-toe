'use strict'
const gameController = require('../game/gameController')

const logOutRequested = function () {
  console.log('playerAuthnRx: logOutRequested')
  // Pass request to gameController first.
  // If a game is in progress, it should be saved first before log-out starts.
  gameController.logOutRequested()
  // $('#announcement').html('Logging out…')
  // Remove the log-out click handler and button

  // // Store the game at the server, if one was in progess.
  // // Clear game grid
  // // Remove grid's event handler
  // $('#grid').off('click')
  //   api.signOut()
  //     .then(ui.signOutSuccess)
  //     .catch(ui.signOutFailure)
}

module.exports = {
  logOutRequested
}
