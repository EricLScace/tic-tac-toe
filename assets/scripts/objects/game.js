'use strict'
// Game logic.
// Note: UI logic is responsibility of game-ui.js
// Detailed API calls are in game-api.js
const AllPaths = require('./all-paths')
const gameAPI = require('../logic/game-api')
const store = require('../store')

// Define Game constructor
const Game = function () {
  // linear array of game state beginning r1c1, r1c2... r3c2, r3c3
  // expected values: 'X', 'O', ''
  this.arrSquareStates = ['', '', '', '', '', '', '', '', '']
  this.strTurn = 'X'
  this.isFinished = false

  // Ask server to start a game
  this.serverAttempts = 0
  startGame(this)
}

// ===== ===== =====
// AddMove attempts to add the next move at the specified grid square.
// Returns:
//  'win' if the move finishes the game in a win.
//  'draw' if the game cannot be won.
//  'occupied' if player clicked on occupied square.
//  false if game can continue
Game.prototype.addMove = function (intSquareIndex) {
  // Ignore if user did not click in the grid within the <div>.
  if (!intSquareIndex) { return false }

  // Can this square be marked?
  if (this.arrSquareStates[intSquareIndex] !== '') {
    // No. Ignore move & post advice
    return 'occupied'
  }

  // Mark the square in memory
  this.arrSquareStates[intSquareIndex] = this.strTurn

  // Instantiate an AllPaths to evaluate the state of play
  const objAllPaths = new AllPaths(this.arrSquareStates)

  if (objAllPaths.isWin) {
    // objAllPaths.isWin contains {'X', array of winning paths} or {'O', array of winning paths}
    this.isFinished = true
    addMoveToServer(this, intSquareIndex)
    return this.strTurn // For now, simple return of winning mark.
  }
  if (objAllPaths.isDraw) {
    this.isFinished = true
    addMoveToServer(this, intSquareIndex)
    return 'draw'
  }
  // game continues… change turn
  addMoveToServer(this, intSquareIndex)
  this.strTurn = this.strTurn === 'X' ? 'O' : 'X'
  return false
}

// ===== ===== =====
// Helper functions to add the move on the server
const addMoveToServer = function (objGame, intSquareIndex) {
  // Update server, if a game ID was created earlier.
  if (objGame.id) {
    gameAPI.addMove(intSquareIndex, objGame.strTurn)
      .then(onAddMoveSuccess)
      .catch(onAddMoveFailure)
  } else {
    // Try again to create the game on the server & then catch up.
    startGame(objGame)
  }
}

const onAddMoveSuccess = function (objResponse) {
  // Async behavior may mean that server response arrives after some
  // moves occurred, and the server must be brought up to date.
  store.objGame.serverAttempts = 0 // Reset server attempt counter
  verifyGame(objResponse)
}

const onAddMoveFailure = function (objResponse) {
  // Try up to 6 times to bring game grid current on server
  if (store.objGame.serverAttempts++ < 6) {
    // Re-transmit one square to the server to get its current game grid for
    // verification.
    gameAPI.addMove(4, store.objGame.arrSquareStates[4])
      .then(onAddMoveSuccess)
      .catch(onAddMoveFailure)
  }
}

// ===== ===== ===== =====
// Functions to start a game on the server
const startGame = function (objGame) {
  // Attempt to start a new game on the server.
  // If 6 attempts are unsuccessful, give up and just finish a local game
  // without recording it to server.
  if (objGame.serverAttempts++ < 6) {
    gameAPI.startGame()
      .then(onStartGameSuccess)
      .catch(onStartGameFailure) // Retry up to 6 times.
  }
}

const onStartGameSuccess = function (objResponse) {
  store.objGame.serverAttempts = 0 // Reset server attempt counter
  store.objGame.id = objResponse.game.id
  // Async behavior may mean that server response arrives after some
  // moves occurred, and the server must be brought up to date.
  verifyGame(objResponse)
}

const onStartGameFailure = function (objResponse) {
  // Try to start the game on the server again, if less than 6 attempts made to date.
  startGame(store.objGame)
}

const verifyGame = function (objResponse) {
  // If any part of server's game grid doesn't match the local game,
  // assume the server is behind in recording moves and send it a correction.
  // Try this a max of 6 times for each move recording attempt.
  // objResponse.game.cells[]
  console.log('game: verifyGame', objResponse)
}

module.exports = Game
