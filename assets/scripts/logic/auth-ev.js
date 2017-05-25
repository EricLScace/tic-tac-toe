'use strict'

const api = require('./auth-api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./auth-ui')

// event.target must be an HTML form
const onSignUp = function (e) {
  // prefer coding 'event.target' rather than 'this'
  // ALWAYS preventDefault first!
  e.preventDefault()

  const objSignUp = getFormFields(e.target)

  // use AJAX to initiate HTTP request, defined in api module, for sign-up
  api.signUp(objSignUp)
    // Promise .then waits for the async operation
    // Mandatory to avoid race conditions introduced by network delays
    .then(ui.signUpSuccess)
    // subsequent .then will pass the return from the previous .then as the
    // first argument to the callback function.
    .catch(ui.signUpFailure)
}

const onSignIn = function (e) {
  e.preventDefault()
  const objSignIn = getFormFields(e.target)
  api.signIn(objSignIn)
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

// const addHandlers = () => {
//   // on gives the callback an event (provided by the browser) as first argument
//   // forms fire 'submit' events. Do not listen for click on the input button, as
//   // we will not received data from the form.
//   // $('#change-password').on('submit', onChangePassword)
//   // $('#log-out').on('click', onLogOut)
//   $('#sign-in').on('submit', onSignIn)
//   $('#sign-up').on('submit', onSignUp)
// }

module.exports = {
//  addHandlers
  onSignIn,
  onSignUp
}
