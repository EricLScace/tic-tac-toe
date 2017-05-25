'use strict'

const onLogOut = function (e) {
  e.preventDefault()
  // $('#announcement').html('Logging out…')
  // // Store the game at the server, if one was in progess.
  // // Clear game grid
  // // Remove grid's event handler
  // $('#grid').off('click')
  console.log('authnUIrx onLogOut')
//   api.signOut()
//     .then(ui.signOutSuccess)
//     .catch(ui.signOutFailure)
}

module.exports = {
  onLogOut
}
