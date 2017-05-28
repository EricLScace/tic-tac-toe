'use strict'
// API calls about games
const config = require('../config')
const store = require('../store')

// Add a new game or move
const addMove = function (intCell, strXO) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.objGame.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.objPlayer.authNToken
    },
    data: {
      'game': {
        'cell': {
          'index': intCell,
          'value': strXO
        },
        'over': store.objGame.isFinished
      }
    }
  })
}

// Fetch games for this player
const getMyGames = function () {
  return $.ajax({
    url: config.apiOrigin + '/games?over=true',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.objPlayer.authNToken
    },
    data: {
      credentials: {
        'id': store.objPlayer.id
      }
    }
  })
}

// Start a new game
const startGame = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.objPlayer.authNToken
    },
    data: {}
  })
}

module.exports = {
  addMove,
  getMyGames,
  startGame
}
