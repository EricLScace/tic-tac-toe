'use strict'

// Contains all calls to the authentication API

const config = require('../config')
const objPlayer = require('../objects/player')

// Invokes sign-up API
const signUp = function (objSignUp) {
  // per API documentation, objSignUp must be of form:
  // {
  //   credentials: {
  //     email: "string",
  //     password: "string",
  //     password_confirmation: "string"
  //   }
  // }

  // Cache credentials for log-in after successful registration
  objPlayer.fnIsLoggedIn(
    null, objSignUp.credentials.email, objSignUp.credentials.password)

  // Attempt to register
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data: objSignUp
  })
}

const signIn = function (objSignIn) {
  // per API documentation, objSignIn must be of form:
  // {
  //   credentials: {
  //     email: "string",
  //     password: "string"
  //   }
  // }

  // Cache credentials for re-authentication on password change
  objPlayer.fnIsLoggedIn(
    null, objSignIn.credentials.email, objSignIn.credentials.password)

  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data: objSignIn
  })
}

const signOut = function () {
//   return $.ajax({
//     url: 'http://localhost:4741/sign-out/' + objUserAuthNToken.strId,
//     method: 'DELETE',
//     headers: {
//       'Authorization': 'Token token=' + objUserAuthNToken.strAuthNToken
//     }
//   })
}

// const changePassword = function (objPasswordsOldNew) {
//   console.log('api.changePassword invoked with data', objPasswordsOldNew)
//   console.log('and on objUserAuthNToken', objUserAuthNToken)
//   return $.ajax({
//     url: 'http://localhost:4741/change-password/' + objUserAuthNToken.strId,
//     method: 'PATCH',
//     headers: {
//       'Authorization': 'Token token=' + objUserAuthNToken.strAuthNToken
//     },
//     data: objPasswordsOldNew
//   })
// }

module.exports = {
  // changePassword,
  signIn,
  signOut,
  signUp
}

// Can be used to debug random error handling
// new Promise(function (resolve, reject) {
//   if (Math.random() > 0.5) {
//     resolve('in signUp')
//   } else {
//     const error = new Error('Random')
//     error.data = data
//     reject(error)
//   }

// .then((response) => {
//   console.log('api.signUp AJAX response:', response)
  // store.userToken = response.user.token
  // return store.userToken
// })
