'use strict'
const config = require('../../config')

const logIn = function (objProferredCredentials) {
  // per API documentation, objProferredCredentials must be of form:
  // {
  //   credentials: {
  //     email: "string",
  //     password: "string"
  //   }
  // }
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data: objProferredCredentials
  })
}

// const logOut = function () {
//   console.log('authnAPItx: logOut')

  // $('#grid').off('click')
  //   api.signOut()
  //     .then(ui.signOutSuccess)
  //     .catch(ui.signOutFailure)

  //  return $.ajax({
  //     url: 'http://localhost:4741/sign-out/' + objUserAuthNToken.strId,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': 'Token token=' + objUserAuthNToken.strAuthNToken
  //     }
  //   })
// }

module.exports = {
  logIn
  // logOut
}
