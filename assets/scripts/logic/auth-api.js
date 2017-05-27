'use strict'
// Contains all calls to the authentication API
const config = require('../config')
const store = require('../store')

const changePassword = function (objProfferedCredentials) {
  // const blob = {
  //   url: config.apiOrigin + '/change-password/' + store.objPlayer.id,
  //   method: 'PATCH',
  //   headers: {
  //     'Authorization': 'Token token=' + store.objPlayer.authNToken
  //   },
  //   data: {
  //     'passwords': {
  //       'old': objProfferedCredentials.credentials.old,
  //       'new': objProfferedCredentials.credentials.new
  //     }
  //   }
  // }
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.objPlayer.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.objPlayer.authNToken
    },
    data: {
      'passwords': {
        'old': objProfferedCredentials.credentials.old,
        'new': objProfferedCredentials.credentials.new
      }
    }
  })
}

const signIn = function (objProfferedCredentials) {
  // per API documentation, objSignIn must be of form:
  // {
  //   credentials: {
  //     email: "string",
  //     password: "string"
  //   }
  // }
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data: objProfferedCredentials
  })
}
// Invokes sign-up API
const signUp = function (objProfferedCredentials) {
  // per API documentation, objSignUp must be of form:
  // {
  //   credentials: {
  //     email: "string",
  //     password: "string",
  //     password_confirmation: "string"
  //   }
  // }
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data: objProfferedCredentials
  })
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

module.exports = {
  changePassword,
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
// })
