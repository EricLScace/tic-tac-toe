'use strict'

const Game = require('../objects/game')
let objGame = {}

// Click on the grid
const onGridClick = function (e) {
  // Process the click in the game grid.
  // ALWAYS preventDefault first!
  e.preventDefault()

  // Returns true if game is over.
  if (objGame.addMove(e.target.id)) {
    // Remove grid's event handler
    $('#grid').off('click')
    // Store the game at the server.
    // Add a Play again button & listener
    $('.announcements').append('<br><input type="button" id="play-again" value="Play again">')
    $('#play-again').on('click', onPlayAgain)
  }
}

// Start a new game
const onNewGame = function () {
  // Clear announcements area
  $('announcements').html('')

  // Load new game grid
  $('#grid').load('assets/html/game-grid.html', function () {
    // When grid has loaded, add delegated event handler to grid.
    $('#grid').on('click', onGridClick)
    // Instantiate a new game
    objGame = new Game()
    // Tell players to start
    $('.announcements').html('X plays first.')
  })
}

const onPlayAgain = function (e) {
  // ALWAYS preventDefault first!
  e.preventDefault()

  // Remove button handler
  $('#play-again').off('click')

  // Load & start a new game.
  onNewGame()
}

module.exports = {
  onNewGame,
  onGridClick
}
