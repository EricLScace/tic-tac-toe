'use strict'

const playerAuthnRx = require('./playerAuthnRx')

const onLogOutClick = function (e) {
  e.preventDefault()
  console.log('authnUIrx: onLogOutClick')
  // Punt to playerAuthn to handle API, game, authN UI and authN announcements.
  playerAuthnRx.logOutRequested()
}

module.exports = {
  onLogOutClick
}
