'use strict'

// Although one could just pass in the authentication object from the API sign-in,
// the following approach decouples the API design from the internals
// of the client.

// Note: AuthN = authentication, as distinct from
// AuthZ = authorization (not used here).

// Define Player constructor
const Player = function (bool, strName, strId, strAuthNToken, strPassword) {
  this.setLogInStatus(bool, strName, strId, strAuthNToken, strPassword)
}

// Define function used both for constructor and as a public method.
// Three forms of this function:
// _setLogInStatus(true, strName, strId, strAuthNToken) to record a log-in &
//    returns true.
// _setLogInStatus(false) logs out the player; returns false
// _setLogInStatus(null, strName, strId) to cache a name and
//    password (received as strID).
//    Used if we want to re-authenticate user in the immediate future; e.g.,
//    to log a new user in after he was successfully registered.
Player.prototype.setLogInStatus = function (bool, strName, strId, strAuthNToken, strPassword) {
  if (arguments.length > 0) {
    switch (bool) {
      case true:
        // Accept proffered credentials as logged in.
        this._isLoggedIn = true
        this.id = strId
        this.authNToken = strAuthNToken
        break

      case null:
        // Cache proffered name & password for future use
        this._isLoggedIn = null
        this.name = strName
        this._password = strPassword
        break

      case false:
        // Log out a player by changing _isLoggedIn and erasing credentials.
        this._isLoggedIn = false
        this.name = ''
        this.id = ''
        this.authNToken = ''
        this._password = ''
    }
  }
  return this._isLoggedIn
}

// Player.prototype.getCredentials = function () {
//   return {
//       credentials: {
//         email: this.name,
//         id: this.id,
//         password_confirmation: "string"
//       }
//   }
// }

module.exports = Player
