'use strict'

const AllPaths = require('./all-paths')

// Define Game constructor
const Game = function () {
  // linear array of game state beginning r1c1, r1c2... r3c2, r3c3
  // expected values: 'x', 'o', ''
  this._arrSquareStates = ['', '', '', '', '', '', '', '', '']
  this._strTurn = 'X'
}

// AddMove attempts to add the next move at the specified
// grid square.
// Returns false if the grid square is occupied.
// If grid square is free:
// • updates the displayed game grid
// • updates the announcements window
// • updates the server after each move
// • Returns null if game continues
// • Returns true if game is over (draw or win)
Game.prototype.addMove = function (intSquareIndex) {
  // Can this square be marked?
  if (this._arrSquareStates[intSquareIndex] !== '') {
    // No. Ignore move & post advice
    $('.announcements').html('Sorry ' + this._strTurn +
      ', you cannnot change an occupied square. Click an empty square .')
    // Return false
    return false
  }

  // Mark the square in memory & on DOM
  this._arrSquareStates[intSquareIndex] = this._strTurn
  $('#' + intSquareIndex).html(this._strTurn)

  // Instantiate an AllPaths to evaluate the state of play
  const objAllPaths = new AllPaths(this._arrSquareStates)

  // If game is a draw…
  if (objAllPaths.isDraw) {
    // Tell server game is over
    // Post announcement
    $('.announcements').html('Game is a draw.')

    // Return true
    return true
  }
  if (objAllPaths.isWin) {
  // If game is won
    // Tell server game is over
    // Highlight winning paths
    // Post announcement
    $('.announcements').html(this._strTurn + ' won!')

    // Refresh player win total
    // Return true
    return true
  }

  // Else games continues
  // Update server with move

  // Post announcement: who plays next
  // Change turn
  this._strTurn = this._strTurn === 'X' ? 'O' : 'X'
  $('.announcements').html(this._strTurn + '\'s turn…')
  // ... and does he have to be careful?
  // ... or is he doomed?
  // Return null
  return null
}

module.exports = Game
