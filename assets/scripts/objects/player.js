'use strict'

// Although one could just pass in the authentication object from the API sign-in,
// the following approach decouples the API design from the internals
// of the client.

// Note: AuthN = authentication, as distinct from
// AuthZ = authorization (not used here).

// Define Player constructor
const Player = function (bool, strName, strId, strAuthNToken) {
  this._setLogInStatus(bool, strName, strId, strAuthNToken)
}

// Define private function used both for constructor and as a private method.
// Three forms of this function:
// _setLogInStatus(true, strName, strId, strAuthNToken) to record a log-in &
//    returns true.
// _setLogInStatus(false) logs out the player; returns false
// _setLogInStatus(null, strName, strId) to cache a name and
//    password (received as strID).
//    Used if we want to re-authenticate user in the immediate future; e.g.,
//    to log a new user in after he was successfully registered.
Player.prototype._setLogInStatus = function (bool, strName, strId, strAuthNToken) {
  if (arguments.length > 0) {
    switch (bool) {
      case true:
        // Accept proffered credentials as logged in.
        this._isLoggedIn = true
        this.name = strName
        this.id = strId
        this.authNToken = strAuthNToken
        break

      case null:
        // Cache proffered name & password for future use
        // Don't change log-in status unless undefined
        if (this._isLoggedIn === undefined) {
          this.isLoggedIn = false
        }
        this.name = strName
        this.password = strId
        break

      case false:
        // Log out a player by changing _isLoggedIn and erasing credentials.
        this._isLoggedIn = false
        this.name = ''
        this.id = ''
        this.authNToken = ''
    }
  }
  return this._isLoggedIn
}

// Four forms of fnIsLoggedIn method:
// fnIsLoggedIn() returns true if logged in, false if not.
// fnIsLoggedIn(true, strName, strId, strAuthNToken) to record a log-in &
//    returns true.
// fnIsLoggedIn(false) logs out the player; returns false
Player.prototype.fnIsLoggedIn = function (bool, strName, strId, strAuthNToken) {
  return this._setLogInStatus(bool, strName, strId, strAuthNToken)
}

module.exports = Player
