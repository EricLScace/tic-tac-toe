'use strict'
// Log-out functions
const authLogIn = require('./authLogIn')
const config = require('../config')
const store = require('../store')

const onLogOut = function (e) {
  e.preventDefault()
  // // Store the game at the server, if one was in progess.
  // // Clear game grid & remove its click handler
  $('#grid').html('')
  $('#grid').off('click')
  $('#announcement').html('Logging out…')
  signOut()
    .then(logOutSuccess)
    .catch(logOutFailure)
}

const logOutSuccess = function (objResponse) {
  $('#announcement').html('')
  authLogIn.addLogInRegister()
}

const signOut = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.objPlayer.id,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.objPlayer.authNToken
    }
  })
}
const logOutFailure = function (objResponse) {
  // Usually this is a token value problem.
}

module.exports = {onLogOut}
