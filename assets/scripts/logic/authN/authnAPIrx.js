'use strict'

const rxLogInFail = function () {
  console.log('authAPIrx: logInFail')
}

const rxLogInOK = function () {
  console.log('authAPIrx: logInOK')
  // Remove event listeners & forms
  // $('#log-in').off('submit')
  $('#player').html('')
  // Punt to playerAuthnRx to
}

module.exports = {
  rxLogInFail,
  rxLogInOK
}
