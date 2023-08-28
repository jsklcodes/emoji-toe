const Player = (name, mark) => ({ name, mark });

const Board = (() => {
  let board = Array(9).fill('');

  const getBoard = () => board;

  const reset = () => (board = Array(9).fill(''));

  const isFull = () => board.every(square => square !== '');

  const markSquare = squareId => {
    board[squareId] = Game.getCurrentPlayer().mark;
    Game.switchPlayer();
  };

  return { getBoard, markSquare, isFull, reset };
})();

const Game = (() => {
  const players = [Player('Ghost', '👻'), Player('Alien', '👽')];
  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const resetCurrentPlayer = () => (currentPlayer = players[0]);

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const checkWinner = board => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return lines.some(
      line =>
        board[line[0]] && line.every(index => board[index] === board[line[0]])
    );
  };

  const checkTie = () => {
    return Board.isFull() && checkWinner(Board.getBoard()) === false;
  };

  const restart = () => {
    Board.reset();
  };

  return {
    getCurrentPlayer,
    switchPlayer,
    checkWinner,
    checkTie,
    restart,
    resetCurrentPlayer,
  };
})();
