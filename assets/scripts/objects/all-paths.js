'use strict'

const Path = require('./path')

// allPaths contains all 8 paths in tic-tac-toe:
// 3 columns
// 3 rows
// 2 diagonals

// Define allPaths constructor
const AllPaths = function (arrSquareStates) {
  this._arrAllPaths = [
    // create array of all paths & set their state according to current game state
    new Path([0, 1, 2], arrSquareStates),  // rows
    new Path([3, 4, 5], arrSquareStates),
    new Path([6, 7, 8], arrSquareStates),
    new Path([0, 3, 6], arrSquareStates),  // columns
    new Path([1, 4, 7], arrSquareStates),
    new Path([2, 5, 8], arrSquareStates),
    new Path([0, 4, 8], arrSquareStates),  // diagonals
    new Path([2, 4, 6], arrSquareStates)
  ]

  // .isWin set as follows:
  // • false: no winner (yet)
  // * object containing:
  //    mark: 'x' or 'y' wins,
  //    paths: [ [0, 1, 2], [0, 4, 8]… ] arrays of 3 indices,
  //      each indicating a winning path
  //  The .isWin object is useful in updating the UI.

  // Start by assuming neither a win nor draw exist yet.
  this.isWin = false
  this.isDraw = false

  const _arrWinningPaths = []
  let _strWinningMark = ''
  let _intFullPathCount = 0
  // Check every path
  for (let j = 0; j < 8; j++) {
    // Search for one or more winning paths
    // .isFull returns false if a path is not full;
    //   otherwise returns the mark that won
    // If all 8 paths are full, and none has equal marks, then game is draw
    switch (this._arrAllPaths[j].isFull) {
      case 'X': {   // X won
        _strWinningMark = 'X'
        _arrWinningPaths.push(this._arrAllPaths[j].arrPathIndices)
        break
      }
      case 'O': {   // O won
        _strWinningMark = 'O'
        _arrWinningPaths.push(this._arrAllPaths[j].arrPathIndices)
        break
      }
      case true: {
        _intFullPathCount++
      }
    }
  }

  // Were one or more winning paths identified?
  if (_strWinningMark !== '') {
    // Yes: prepare the return object and return
    this.isWin = {
      mark: _strWinningMark,
      paths: _arrWinningPaths
    }
    return
  }

  // .isDraw = true if game is a draw; else false.
  // Works by proving a draw does NOT exist.
  this.isDraw = true
  // Were all 8 paths full without a winning path?
  if (_intFullPathCount === 8) { return 'draw' }

  // Check each path until a potential empty path that could be won is found.
  for (let i = 0; i < 8; i++) {
    // if this path has 2 marks, both the same, and a hole, it could be won
    if (this._arrAllPaths[i].isTwoEqual) {
      this.isDraw = false
      return
    }

    // if just 1 or no marks, game could be won
    if (this._arrAllPaths[i].intNrMarks <= 1) {
      this.isDraw = false
      return
    }
  }
}

module.exports = AllPaths
