'use strict'
// API calls about games
const config = require('../config')
const store = require('../store')

// Add a new game or move
const addMove = function () {}

// Game is finished
const finished = function () {}

// Fetch games for this player
// Generates a 404 error if no games exist for this player ID.
const getMyGames = function () {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.objPlayer.id,
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.objPlayer.authNToken
    }
  })
}

// Start a new game
const startGame = function () {
  // return $.ajax({
  //   url: config.apiOrigin + '/games',
  //   method: 'POST',
  //   headers: {
  //     'Authorization': 'Token token=' + store.objPlayer.authNToken
  //   },
  //   data: {}
  // })
}

module.exports = {
  addMove,
  finished,
  getMyGames,
  startGame
}
