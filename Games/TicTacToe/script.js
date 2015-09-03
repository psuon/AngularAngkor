"use strict";

/**
* Performs strict recursive comparison of two objects.
* Example call: [1, 2 [undefined, 3]].equals([1, 2 [undefined, 3]]);
* Returns: true
*/
Object.prototype.equals = function (obj) {
    var i;
    // Since undefined and null will not have 'equals' in their
    // prototype, any other object is not equal them. 
    if (obj === undefined || obj === null) {
        return false;
    }
    // If two objects being compared are primitives
    // we can compare them without recursion.
    if (typeof (obj) !== 'object' && this !== obj) {
        return false;
    }
    // For two objects to be equal their lengths and
    // constructors should be equal as well.
    if (this.constructor !== obj.constructor ||
            this.length !== obj.length) {
        return false;
    }
    // Traversing properties of the object.
    for (i in this) {
        // Avoiding comparison of properties in prototype.
        if (this.hasOwnProperty(i)) {
            if (this.propertyIsEnumerable(i) && obj.propertyIsEnumerable(i)) {
                try {
                    // Recursive call for each object property.
                    if (!this[i].equals(obj[i])) {
                        return false;
                    }
                } catch (e) {
                    // You are here if this[i] is null or undefined.
                    // That is because they won't have 'equals' in their prototype.
                    if (this[i] !== obj[i]) {
                        return false;
                    }
                }
            }
        }
    }
    // Assuming that objects are equal by default.
    // In case they are not it will be returned earlier.
    return true;
};
/**
* Handy method for populating new array of needed length
* and default value.
* Example call: [].repeat(0, 3);
* Returns: [0, 0, 0]
*/
Array.prototype.repeat = function (what, len) {
    while (len > 0) {
        len -= 1;
        this.push(what);
    }
    return this;
};
/**
* Shuffles array at random.
* Uses: http://en.wikipedia.org/wiki/Fisher-Yates_shuffle
* Example call: [1, 2, 3, 4].shuffle();
*/
Array.prototype.shuffle = function () {
    var j, i = this.length, tmp;
    while (i > 0) {
        i -= 1;
        j = Math.floor(Math.random() * (i + 1));
        tmp = this[j];
        this[j] = this[i];
        this[i] = tmp;
    }
};
/**
* Function used to test assertion given as callback.
* Example call: assert(function () { return 5 > 1; }, '5 is greater than 1 test');
* Logs to console: 5 is greater than 1 test: OK 
*/
var assert = function (condition, message) {
    if (condition() === false) {
        console.log(message + ': FAIL');
    } else {
        console.log(message + ': OK');
    }
};

/**
* Since some objects of the game will be working with the DOM
* I've placed whole game into function that is executed after 
* the DOM is fully loaded.
*/
$(document).ready(function () {

    var TicTacToe = {
            /**
             * Returns true if all the elements in array are equal 
             * or if it's empty. 
             */
            allEqual: function (array) {
                return array.length === 0 || array.equals([].repeat(array[0], array.length));
            },
            /**
            * This constructor represents a tic tac toe board state.
            */
            Board:  {
                Empty: undefined,
                PlayerX: true,
                PlayerO: false,
                /**
                * I tried before with two dimensional array.
                * But it complicates the algorithm.
                */
                pieces: [].repeat(this.Empty, 9),
                /**
                * Shows the current state of the board.
                */
                output: function () {
                    TicTacToe.BoardDrawer.draw(this.pieces);
                },
                /**
                * Determine if one player has won the game. Returns PlayerX,
                * PlayerO or undefined.
                */
                winner: function () {
                    var winningRows = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
                                       [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
                                       [0, 4, 8], [2, 4, 6]],           // diagonal
                        i,
                        pieces,
                        /**
                        * This is used in the following loop.
                        * Returns contents of the board for the winningRows[i]
                        */
                        winningRowVal = function (board, i) {
                            var j, array = [];
                            for (j = 0; j < winningRows[i].length; j += 1) {
                                array.push(board.pieces[winningRows[i][j]]);
                            }
                            return array;
                        };
                    // Searches for 3 in a row, column or diagonal.
                    for (i = 0; i < winningRows.length; i += 1) {
                        if (this.pieces[winningRows[i][0]] !== this.Empty &&
                                TicTacToe.allEqual(winningRowVal(this, i))) {
                            return this.pieces[winningRows[i][0]];
                        }
                    }
                },
                /**
                * Returns a list of valid moves.
                */
                getValidMoves: function () {
                    var validMoves = [], i;
                    for (i = 0; i < this.pieces.length; i += 1) {
                        if (this.pieces[i] === this.Empty) {
                            validMoves.push(i);
                        }
                    }
                    return validMoves;
                },
                /**
                * Return true if one player has won or if there are no valid moves left.
                */
                gameOver: function () {
                    return this.winner() !== undefined || this.getValidMoves().length === 0;
                },
                /**
                * This function doesn't check if the move is valid.
                */
                makeMove: function (move, player) {
                    this.pieces[move] = player;
                },
                /**
                * This function is used later to restore state of the board.pieces
                * after exploring possible outcomes.
                */
                undoMove: function (move) {
                    this.makeMove(move, this.Empty);
                },
                /**
                * This function is called when the game is over.
                */
                reset: function () {
                    this.pieces = [].repeat(this.Empty, 9);
                }
            },
            /**
            * Manipulates DOM elements of the game.
            */
            BoardDrawer: {
                tiles: $('.board'),
                players: {true: 'X', false: 'O'},
                /**
                * For each Board.pieces piece draws corresponding token.
                * Or hides both if the piece is empty.
                */
                draw: function (pieces) {
                    var i;
                    for (i = 0; i < pieces.length; i += 1) {
                        switch (pieces[i]) {
                        case TicTacToe.Board.PlayerX:
                            this.tiles.find('#' + i + ' .' +
                                this.players[TicTacToe.Board.PlayerX]).show();
                            this.tiles.find('#' + i + ' .' +
                                this.players[TicTacToe.Board.PlayerO]).hide();
                            break;
                        case TicTacToe.Board.PlayerO:
                            this.tiles.find('#' + i + ' .' +
                                this.players[TicTacToe.Board.PlayerO]).show();
                            this.tiles.find('#' + i + ' .' +
                                this.players[TicTacToe.Board.PlayerX]).hide();
                            break;
                        case TicTacToe.Board.Empty:
                        case null:
                        case undefined:
                            this.tiles.find('#' + i + ' .' +
                                this.players[TicTacToe.Board.PlayerX]).hide();
                            this.tiles.find('#' + i + ' .' +
                                this.players[TicTacToe.Board.PlayerO]).hide();
                            break;
                        }
                    }
                }
            },
            /**
            * Represents player.
            * makeMove is invoked on mouse click.
            */
            humanPlayer: {
                token: true,
                makeMove: function (move) {
                    TicTacToe.Board.makeMove(move, this.token);
                    TicTacToe.Board.output();
                }
            },
            /**
            * Represents computer.
            * makeMove is invoked after player has made his move.
            */
            computerPlayer: {
                token: false,
                /**
                * Brute force game tree traversal.
                */
                makeMove: function () {
                    /**
                    * Depending on the winner decides favorability of the outcome.
                    * 1 - Good, 0 - OK, -1 - Bad.
                    */
                    var judge = function (winner) {
                        var decision;
                        switch (winner) {
                        case TicTacToe.computerPlayer.token:
                            decision = 1;
                            break;
                        case undefined:
                            decision = 0;
                            break;
                        default:
                            decision = -1;
                        }
                        return decision;
                    },
                        /**
                        * Recursively evaluates possible moves.
                        */
                        evaluateMove = function (move, player) {
                            var outcomes, outcome, o, minElement, maxElement;
                            try {
                                TicTacToe.Board.makeMove(move, player);
                                // If the move is terminal we return it's favorability.
                                if (TicTacToe.Board.gameOver()) {
                                    return judge(TicTacToe.Board.winner());
                                }
                                /**
                                * Makes a list of next possible moves.
                                */
                                outcomes = function () {
                                    var i = 0, nextMoves = TicTacToe.Board.getValidMoves();
                                    /**
                                    * Returns one at a time evaluation of a move in the nextMoves.
                                    * If the end of moves is reached returns false to stop iteration.
                                    */
                                    return function () {
                                        var evaluated;
                                        if (i < nextMoves.length) {
                                            evaluated = evaluateMove(nextMoves[i], !player);
                                            i += 1;
                                            return evaluated;
                                        }
                                        return false;
                                    };
                                };
                                /**
                                * If we are the current player. We need to expect worst 
                                * (because the next move is the opponent's), so we return the worst
                                */
                                if (player === TicTacToe.computerPlayer.token) {
                                    minElement = 1;
                                    outcome = outcomes();
                                    while (true) {
                                        o = outcome();
                                        if (o === false) {
                                            break;
                                        }
                                        if (o === -1) {
                                            return o;
                                        }
                                        minElement = Math.min(o, minElement);
                                    }
                                    return minElement;
                                }
                                maxElement = -1;
                                outcome = outcomes();
                                while (true) {
                                    o = outcome();
                                    if (o === false) {
                                        break;
                                    }
                                    if (o === 1) {
                                        return o;
                                    }
                                    maxElement = Math.max(o, maxElement);
                                }
                                return maxElement;
                            } finally {
                                // Restore the Board to the original state.
                                TicTacToe.Board.undoMove(move);
                            }
                        },
                        // Evaluates next possible moves and return array of [move weight, move].
                        moves = (function () {
                            var i, moves = TicTacToe.Board.getValidMoves(),
                                result = [];
                            for (i = 0; i < moves.length; i += 1) {
                                result.push([evaluateMove(moves[i], TicTacToe.computerPlayer.token), moves[i]]);
                            }
                            return result;
                        }());
                    // Moves are shuffled so that computer doesn't make the same move every time.
                    moves.shuffle();
                    // Makes the most favorable moves to be in the end of the array.
                    moves.sort();
                    TicTacToe.Board.makeMove(moves[moves.length - 1][1], this.token);
                    TicTacToe.Board.output();
                }
            },
            /**
            * The function that puts all together.
            */
            game: function () {
                var board = TicTacToe.BoardDrawer.tiles.find('.tile'),
                    currentPlayer;
                // Makes human player the first to make a move.
                // This variable is used for players to take turns.
                currentPlayer = TicTacToe.Board.PlayerX;

                // Binds the mouse click on the tiles to the game.
                board.click(function (event) {
                    /**
                    * Invoked when the game is over to reset the state,
                    * report the winner and start over.
                    */
                    var endGame = function () {
                        var winner = TicTacToe.Board.winner();
                        if (winner === TicTacToe.humanPlayer.token) {
                            alert('You won!');
                        } else if (winner === TicTacToe.computerPlayer.token) {
                            alert('You lost!');
                        } else {
                            alert('Draw.');
                        }
                        TicTacToe.Board.reset();
                        TicTacToe.Board.output();
                        board.unbind('click');
                        TicTacToe.game();
                    };
                    // If game is not over.
                    if (!TicTacToe.Board.gameOver()) {
                        // If the tile player clicked is empty and it's his turn.
                        if (TicTacToe.Board.pieces[this.id] === TicTacToe.Board.Empty &&
                                currentPlayer === TicTacToe.humanPlayer.token) {
                            // Make move, change current player to computer.
                            TicTacToe.humanPlayer.makeMove(this.id);
                            currentPlayer = !currentPlayer;
                            // If after player's move the game is still not over.
                            if (!TicTacToe.Board.gameOver()) {
                                // Make move, change current player to human.
                                TicTacToe.computerPlayer.makeMove();
                                currentPlayer = !currentPlayer;
                                // If computer's move has ended the game.
                                if (TicTacToe.Board.gameOver()) {
                                    endGame();
                                }
                            } else {
                                endGame();
                            }
                        }
                    } else {
                        endGame();
                    }
                });
            }
        },
        /**
        * A little test suit to confirm that everything works as expected.
        */
        TicTacToeTest = {
            // Tests allEqual method of the TicTacToe object.
            allEqualTest: function () {
                assert(function () {
                    return TicTacToe.allEqual([1, 1, 1]) === true;
                },
                    'allEqual: when equals');
                assert(function () {
                    return TicTacToe.allEqual([1, 2, 3]) === false;
                },
                     'allEqual: when not equals');
            },
            // Tests TicTacToe.Board.winner method.
            BoardWinnerTest: function () {
                var x = TicTacToe.Board.PlayerX,
                    o = TicTacToe.Board.PlayerO,
                    e = TicTacToe.Board.Empty;

                TicTacToe.Board.pieces = [x, e, o,
                                          e, x, e,
                                          e, e, o];
                assert(function () {
                    return TicTacToe.Board.winner() === undefined;
                },
                       'Board.winner: no winner');

                TicTacToe.Board.pieces = [x, x, x,
                                          e, e, o,
                                          o, o, e];
                assert(function () {
                    return TicTacToe.Board.winner() === x;
                },
                       'Board.winner: in a first row');

                TicTacToe.Board.pieces = [e, x, e,
                                          o, o, o,
                                          x, x, e];
                assert(function () {
                    return TicTacToe.Board.winner() === o;
                },
                       'Board.winner: in a second row');

                TicTacToe.Board.pieces = [x, o, x,
                                          e, e, x,
                                          o, o, o];
                assert(function () {
                    return TicTacToe.Board.winner() === o;
                },
                       'Board.winner: in a third row');

                TicTacToe.Board.pieces = [x, e, o,
                                          x, e, o,
                                          x, o, e];
                assert(function () {
                    return TicTacToe.Board.winner() === x;
                },
                       'Board.winner: in a first column');

                TicTacToe.Board.pieces = [x, o, o,
                                          e, o, e,
                                          x, o, e];
                assert(function () {
                    return TicTacToe.Board.winner() === o;
                },
                       'Board.winner: in a second column');

                TicTacToe.Board.pieces = [x, e, o,
                                          e, e, o,
                                          x, e, o];
                assert(function () {
                    return TicTacToe.Board.winner() === o;
                },
                       'Board.winner: in a third column');

                TicTacToe.Board.pieces = [x, e, o,
                                          e, x, o,
                                          o, o, x];
                assert(function () {
                    return TicTacToe.Board.winner() === x;
                },
                       'Board.winner: in a second diagonal');

                TicTacToe.Board.pieces = [x, e, o,
                                          e, o, x,
                                          o, o, x];
                assert(function () {
                    return TicTacToe.Board.winner() === o;
                },
                       'Board.winner: in a second diagonal');

            },
            boardGetValidMovesTest: function () {
                var x = TicTacToe.Board.PlayerX,
                    o = TicTacToe.Board.PlayerO,
                    e = TicTacToe.Board.Empty;
                TicTacToe.Board.pieces = [x, e, o, x, o, e, e, e, e];
                assert(function () {
                    return TicTacToe.Board.getValidMoves().equals([1, 5, 6, 7, 8]);
                },
                       'Board.getValidMoves: there are valid moves');
                TicTacToe.Board.pieces = [x, x, o, x, o, o, x, x, o];
                assert(function () {
                    return TicTacToe.Board.getValidMoves().equals([]);
                },
                       'Board.getValidMoves: there are no valid moves');
            },
            boardGameOverTest: function () {
                var x = TicTacToe.Board.PlayerX,
                    o = TicTacToe.Board.PlayerO,
                    e = TicTacToe.Board.Empty;
                TicTacToe.Board.pieces = [x, x, x,
                                          e, o, o,
                                          o, e, e];
                assert(function () {
                    return TicTacToe.Board.gameOver();
                },
                       'Baord.gameOver: x won');
                TicTacToe.Board.pieces = [o, x, o,
                                          x, x, o,
                                          o, o, x];
                assert(function () {
                    return TicTacToe.Board.gameOver();
                },
                       'Baord.gameOver: no moves');
                TicTacToe.Board.pieces = [x, e, e,
                                          x, e, e,
                                          o, o, e];
                assert(function () {
                    return !TicTacToe.Board.gameOver();
                },
                       'Baord.gameOver: not over');
            },
            /**
            * Draws few boards on the page so I could visually confirm that
            * Board's representation looks as expeted.
            */
            boardDrawerTest: function () {
                var x = TicTacToe.Board.PlayerX,
                    o = TicTacToe.Board.PlayerO,
                    e = TicTacToe.Board.Empty,
                    test = function () {
                        var pieces = [x, o, o, x, e, e, e, e, e];
                        pieces.shuffle();
                        console.log(pieces);
                        TicTacToe.BoardDrawer.draw(pieces);
                    },
                    interval = setInterval(test, 500);
                setTimeout(function () { clearInterval(interval); }, 5000);
            }
        },
        /**
        * Add this method to a test suite object.
        * Invokes every test in the suite.
        */
        runTests = function () {
            var i;
            for (i in this) {
                if (this.hasOwnProperty(i)) {
                    if (i !== 'runTests') {
                        this[i]();
                    }
                }
            }
        };
    // Like so:
    // TicTacToeTest.runTests = runTests;
    // TicTacToeTest.runTests();

    // Since we don't need player to wait for the testing to be done.
    // The tests call is commented and we run the game.
    TicTacToe.game();
});