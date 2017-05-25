'use strict'
const playerAuthnTx = require('../authN/playerAuthnTx')

const logOutRequested = function () {
  // If a game is in progress, it should be saved first before log-out starts.
  console.log('gameController.logOutRequested: must save game in progress first.')
  // Now start player log-out.
  playerAuthnTx.readyToLogOut()
}

module.exports = {
  logOutRequested
}
