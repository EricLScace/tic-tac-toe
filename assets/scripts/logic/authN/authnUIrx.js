'use strict'
const getFormFields = require('../../../../lib/get-form-fields')
const playerAuthnRx = require('./playerAuthnRx')

// Log-in form submit handler
const onLogInSubmit = function (e) {
  e.preventDefault()
  console.log('authnUIrx: onLogInSubmit')
  // Leave forms on-screen in case user needs to re-try
  playerAuthnRx.logInRequested(getFormFields(e.target))
}

// const onLogOutClick = function (e) {
//   e.preventDefault()
//   console.log('authnUIrx: onLogOutClick')
//   // Punt to playerAuthn to handle API, game, authN UI and authN announcements.
//   playerAuthnRx.logOutRequested()
// }

const addLogInRegisterHandlers = () => {
  $('#log-in').on('submit', onLogInSubmit)
  //  $('#register').on('submit', onRegisterSubmit)
}

const addLogOutHandlers = () => {
  $('#log-out').on('click', onLogOutClick)
}
module.exports = {
  addLogInRegisterHandlers,
  addLogOutHandlers
}
