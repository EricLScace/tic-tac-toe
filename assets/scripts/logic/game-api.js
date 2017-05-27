'use strict'
// API calls about games
const config = require('../config')
const store = require('../store')

// Fetch games for this player
// Generates a 404 error is no games exist
const getMyGames = function () {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.objPlayer.authNToken
    }
  })
}

module.exports = {
  getMyGames
}
