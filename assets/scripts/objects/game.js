'use strict'
const AllPaths = require('./all-paths')
const gameAPI = require('../logic/game-api')

// Define Game constructor
const Game = function () {
  // linear array of game state beginning r1c1, r1c2... r3c2, r3c3
  // expected values: 'x', 'o', ''
  this._arrSquareStates = ['', '', '', '', '', '', '', '', '']
  this._strTurn = 'X'

  // Start new game on server
  gameAPI.startGame()
}

// AddMove attempts to add the next move at the specified
// grid square.
// Returns false if game is not finished.
// If grid square is free:
// • updates the displayed game grid
// • updates the announcements window
// • updates the server after each move
// Returns true if game is over (draw or win)
Game.prototype.addMove = function (intSquareIndex) {
  // Ignore if user did not click in the grid.
  if (!intSquareIndex) { return false }
  // Can this square be marked?
  if (this._arrSquareStates[intSquareIndex] !== '') {
    // No. Ignore move & post advice
    $('#announcement').html('Sorry ' + this._strTurn +
      ', you cannnot change an occupied square. Click an empty square .')
    return false
  }

  // Mark the square in memory & on DOM
  this._arrSquareStates[intSquareIndex] = this._strTurn
  $('#' + intSquareIndex).html(this._strTurn)

  // Instantiate an AllPaths to evaluate the state of play
  const objAllPaths = new AllPaths(this._arrSquareStates)

  // If game is a draw or win…
  if (objAllPaths.isDraw || objAllPaths.isWin) {
    // Tell server game is over
    gameAPI.finished()

    if (objAllPaths.isWin) {
      // Post announcement of win
      $('#announcement').html(this._strTurn + ' won!')
      // Highlight winning paths
    } else {
      // Post announcement of win
      $('#announcement').html('Game is a draw.')
    }

    // Return true to indicate game is over
    return true
  }

  // Else games continues
  // Update server with move
  gameAPI.addMove()

  // Post announcement: who plays next
  // Change turn
  this._strTurn = this._strTurn === 'X' ? 'O' : 'X'
  $('#announcement').html(this._strTurn + '\'s turn…')
  // ... and does he have to be careful?
  // ... or is he doomed?
  // Return false to indicate game continues
  return false
}

module.exports = Game
