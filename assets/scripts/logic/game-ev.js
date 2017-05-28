'use strict'
// UI event handlers for a game
const Game = require('../objects/game')
const gameAPI = require('./game-api')
const gameGridTemplate = require('../templates/gameGrid.handlebars')
const store = require('../store')

// Player clicks on the grid <div>
const onGridClick = function (e) {
  // ALWAYS preventDefault first!
  e.preventDefault()

  // Game.addMove returns:
  //  'X' or 'O' if the move finishes the game in a win.
  //  'draw' if the game cannot be won.
  //  'occupied' if player clicked on occupied square.
  //  false if game can continue
  switch (store.objGame.addMove(e.target.id)) {
    case 'O':
    case 'X':
      // Game contains mark of winner: add it to the grid
      $('#' + e.target.id).html(store.objGame.strTurn)
      gameFinished()
      break
    case 'draw':
      // Game contains mark of winner: add it to the grid
      $('#' + e.target.id).html(store.objGame.strTurn)
      // Post announcement of draw
      $('#announcement').html('Game is a draw.')
      gameFinished()
      break
    case 'occupied':
      // Don't change the grid.
      $('#announcement').html(`Sorry ${store.objGame.strTurn}, you cannnot change an occupied square. Click an empty square.`)
      break
    case false:
      // Game contains mark of next turn, so use the other mark on the grid.
      $('#' + e.target.id).html(store.objGame.strTurn === 'X' ? 'O' : 'X')
      $('#announcement').html(`${store.objGame.strTurn}'s turn…`)
      // ... and does he have to be careful?
      // ... or is he doomed? (enhancements)
  }
}

const gameFinished = function () {
  // Post announcement of win
  $('#announcement').html(`${store.objGame.strTurn} won!`)
  // Highlight winning paths (enhancement)
  // Remove grid's event handler
  $('#grid').off('click')
  // Add a Play again button & listener
  $('#announcement').append('<br><input type="button" id="play-again" value="Play again">')
  $('#play-again').on('click', onPlayAgain)
}

// Start a new game
const newGame = function () {
  // Update player statistics
  // Request game history of this player
  gameAPI.getMyGames()
    .then(getMyGamesSuccess)
    .catch(getMyGamesFailure)

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

const getMyGamesSuccess = function (objResponse) {
  console.log('auth=ui: getMyGamesSuccess', objResponse)
  if (objResponse.games.length) {
    $('#player-name').append(`<br> ${objResponse.games.length} game`)
    if (objResponse.games.length === 1) {
      $('#player-name').append(` recorded.`)
    } else {
      $('#player-name').append(`s recorded.`)
    }
  } else {
    $('#player-name').append('<br>No games recorded.')
  }
}

const getMyGamesFailure = function (objResponse) {
  // When the player ID doesn't exist in the game database, a 404 'not found'
  // error is returned.
  if (objResponse.responseText.includes('Not Found')) {
    $('#player-name').append(`<br>No games recorded.`)
  }
}

const onPlayAgain = function (e) {
  // ALWAYS preventDefault first!
  e.preventDefault()

  // Remove button handler
  $('#play-again').off('click')

  // Load & start a new game.
  newGame()
}

module.exports = {
  newGame,
  onGridClick
}
