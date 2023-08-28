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
