'use strict'
const signInRegisterTemplate = require('../templates/signInRegister.handlebars')
const authUI = require('./auth-ui')

const addLogInRegister = function () {
  $('#player').html(signInRegisterTemplate())
  $('#sign-in').on('submit', authUI.onLogIn)
  $('#sign-up').on('submit', authUI.onSignUp)
}

module.exports = {addLogInRegister}
