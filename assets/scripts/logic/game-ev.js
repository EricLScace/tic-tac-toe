'use strict'
// Event handlers for a game
const Game = require('../objects/game')
const gameGridTemplate = require('../templates/gameGrid.handlebars')
const store = require('../store')

// Player clicks on the grid <div>
const onGridClick = function (e) {
  // Process the click in the game grid.
  // ALWAYS preventDefault first!
  e.preventDefault()

  // Returns true if game is over.
  if (store.objGame.addMove(e.target.id)) {
    // Remove grid's event handler
    $('#grid').off('click')
    // Add a Play again button & listener
    $('#announcement').append('<br><input type="button" id="play-again" value="Play again">')
    $('#play-again').on('click', onPlayAgain)
  }
}

// Start a new game
const onNewGame = function () {
  // Instatiate a new Game
  store.objGame = new Game()

  // Clear announcements area
  $('#announcement').html('')

  // Load new game grid
  const gameGridHtml = gameGridTemplate()
  $('#grid').html(gameGridHtml)

  // Add delegated event handler to grid.
  $('#grid').on('click', onGridClick)

  // Tell players to start
  $('#announcement').html('X plays first.')
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
