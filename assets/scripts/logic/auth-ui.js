'use strict'
// Invoked by API responses & UI actions for register, log-in & log-out
const authAPI = require('./auth-api')
const changePasswordTemplate = require('../templates/changePassword.handlebars')
const getFormFields = require('../../../lib/get-form-fields')
const objGameEvents = require('./game-ev')
const Player = require('../objects/player')
const playerTemplate = require('../templates/player.handlebars')
const signInRegisterTemplate = require('../templates/signInRegister.handlebars')
const store = require('../store')

// ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Change password functions
const onChangePassword = function (e) {
  // ALWAYS preventDefault first!
  e.preventDefault()

  // Suppress game statistics during password change-password
  store.objPlayer.suppressStatistics = true

  // Display the change-password form
  $('#player-name').html('Change ' + store.objPlayer.name + '\'s password:')
  $('#player-actions').html(changePasswordTemplate())
  $('#change-password').on('submit', onChange)
  $('#cancel-button').on('click', onCancel)
}

const onCancel = function (e) {
  // ALWAYS preventDefault first!
  e.preventDefault()

  // Remove click handlers
  $('#change-password').off('submit')
  $('#cancel-button').off('click')

  // Restore player space on screen
  store.objPlayer.suppressStatistics = false
  displayLoggedInPlayer()
}

const onChange = function (e) {
  // ALWAYS preventDefault first!
  e.preventDefault()

  // Future: check that passwords were equal
  authAPI.changePassword(getFormFields(e.target))
    .then(changePasswordSuccess)
    .catch(changePasswordFailure)
}

const changePasswordSuccess = function () {
  // Remove click handlers & report success
  changePasswordResults(true)
}

const changePasswordFailure = function () {
  // Remove click handlers & report failure
  changePasswordResults(false)
}

const changePasswordResults = function (isChanged) {
  // Remove click handlers
  $('#change-password').off('submit', onChange)
  $('#cancel-button').off('click', onCancel)

  // Report success or failure & re-display logged in user, etc
  const message = isChanged
    ? store.objPlayer.name + '\'s password was changed.'
    : 'Could not change' + store.objPlayer.name + '\'s password right now. Try again later.'
  displayLoggedInPlayer(message)
  store.objPlayer.suppressStatistics = false
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Log-in functions
const addLogInRegister = function () {
  $('#player').html(signInRegisterTemplate())
  $('#sign-in').on('submit', onLogIn)
  $('#sign-up').on('submit', onSignUp)
}

const displayLoggedInPlayer = function (message) {
  // Load player space on screen
  $('#player').html(playerTemplate())

  // When load completes, insert logged-in user name
  // preceeded by any supplemental messages; e.g., about password change results
  message = message ? message + '<br>' : ''
  $('#player-name').html(message + store.objPlayer.name + ' logged in.')

  // Add log-out & change-password buttons & event handlers
  // Add change-password button
  $('#player-actions').html('<input type="button" id="change-password-button" value="Change password">')
  $('#change-password-button').on('click', onChangePassword)
  $('#player-actions').append('<input type="button" id="log-out-button" value="Log out">')
  $('#log-out-button').on('click', onLogOut)
}

const onLogIn = function (e) {
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

  authAPI.signIn(objProfferedCredentials)
    .then(logInSuccess)
    .catch(logInFailure)
}

const logInSuccess = function (objResponse) {
  // API returns an object of form
  // {
  //   user: {
  //     email: "string",
  //     id: int,
  //     token: "string"
  //   }
  // }
  $('#announcement').html('Logging in…')
  // Update player credentials
  store.objPlayer.setLogInStatus(true, // logged in
    objResponse.user.email,
    objResponse.user.id,
    objResponse.user.token)

  // Show logged-in player on screen & her ongoing choices: log-out, change-password.
  displayLoggedInPlayer()

  // Load & start new game
  objGameEvents.newGame()
}

const logInFailure = function (objResponse) {
  // API returns a 401 (Unauthorized) failure with object containing:
  // statusText: "Unauthorized"
  $('#announcement').html('<br>Name or password not recognized. Try again, or re-register.')
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Log out functions
const onLogOut = function (e) {
  e.preventDefault()

  // Clear game grid & remove its click handler
  $('#grid').html('')
  $('#grid').off('click')
  $('#announcement').html('Logging out…')
  authAPI.signOut()
    .then(logOutSuccess)
    .catch(logOutFailure)
}

const logOutSuccess = function (objResponse) {
  // Remove 'logging out' message and display log-in/register forms
  $('#announcement').html('')
  addLogInRegister()
}

const logOutFailure = function (objResponse) {
  // Usually this is a token value problem.
  // Assume player token has expired and re-display log-in page.
  $('#announcement').html('')
  addLogInRegister()
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Register a new user functions
const onSignUp = function (e) {
  // event.target must be an HTML form
  // prefer coding 'event.target' rather than 'this'

  // ALWAYS preventDefault first!
  e.preventDefault()

  // Save player's proffered credentials
  const objProfferedCredentials = getFormFields(e.target)

  // Re-instantiate the player in store
  store.objPlayer = new Player(null, // not logged in yet
    objProfferedCredentials.credentials.email,
    null, // no ID
    null, // no token
    objProfferedCredentials.credentials.password)

  // Avoid white space at start or end of his name.
  if (/\s/.test(store.objPlayer.name.slice(-1)) ||
    /\s/.test(store.objPlayer.name.slice(0))) {
    $('#announcement').html('Please do not use non-printing characters at the start or end of your name.')
  } else {
    // use AJAX to initiate HTTP request, defined in api module, for sign-up
    authAPI.signUp(objProfferedCredentials)
      // Promise .then waits for the async operation
      // Mandatory to avoid race conditions introduced by network delays
      .then(signUpSuccess)
      // subsequent .then will pass the return from the previous .then as the
      // first argument to the callback function.
      .catch(signUpFailure)
  }
}

const signUpSuccess = function (objResponse) {
  // Display welcome announcement.
  $('#announcement').html('Welcome, ' +
    objResponse.user.email +
    '. Logging in…')
  const objCredentials = {
    credentials: {
      email: store.objPlayer.name,
      password: store.objPlayer._password
    }
  }
  authAPI.signIn(objCredentials)
    .then(logInSuccess)
    .catch(logInFailure)
}

const signUpFailure = function (objResponse) {
  $('#announcement').html('That name is probably already taken. Try something else.')
}

module.exports = {addLogInRegister}
