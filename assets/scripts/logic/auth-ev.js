'use strict'

const api = require('./auth-api')
const getFormFields = require('../../../lib/get-form-fields')
const Player = require('../objects/player')
const store = require('../store')
const ui = require('./auth-ui')

// event.target must be an HTML form
const onSignUp = function (e) {
  // prefer coding 'event.target' rather than 'this'
  // ALWAYS preventDefault first!
  e.preventDefault()
  // Save player's proffered credentials
  const objProfferedCredentials = getFormFields(e.target)
  const objPlayer = new Player(null, // not logged in yet
    objProfferedCredentials.credentials.email,
    null, // no ID
    null, // no token
    objProfferedCredentials.credentials.password)
  // Cache credentials in store
  store.objPlayer = objPlayer
  // use AJAX to initiate HTTP request, defined in api module, for sign-up
  api.signUp(objProfferedCredentials)
    // Promise .then waits for the async operation
    // Mandatory to avoid race conditions introduced by network delays
    .then(ui.signUpSuccess)
    // subsequent .then will pass the return from the previous .then as the
    // first argument to the callback function.
    .catch(ui.signUpFailure)
}

const onSignIn = function (e) {
  e.preventDefault()
  const objProfferedCredentials = getFormFields(e.target)
  // If there are no cached credentials, create them
  if (!store.objPlayer) {
    const objPlayer = new Player(null, // not logged in yet
      objProfferedCredentials.credentials.email,
      null, // no ID
      null, // no token
      objProfferedCredentials.credentials.password)
    // Cache credentials in store
    store.objPlayer = objPlayer
  }
  api.signIn(objProfferedCredentials)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

//
// const onChangePassword = function (event) {
//   event.preventDefault()
//   const objPasswordsOldNew = getFormFields(event.target)
//   console.log('Event onChangePassword invoked with data', objPasswordsOldNew)
//   console.log('and on objUserAuthNToken', api.objUserAuthNToken)
//   api.changePassword(objPasswordsOldNew)
//     .then(ui.changePasswordSuccess)
//     .catch(ui.changePasswordFailure)
// }

const addLogInRegisterHandlers = () => {
  // on gives the callback an event (provided by the browser) as first argument
  // forms fire 'submit' events. Do not listen for click on the input button, as
  // we will not received data from the form.
  // $('#change-password').on('submit', onChangePassword)
  // $('#log-out').on('click', onLogOut)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  addLogInRegisterHandlers
}
