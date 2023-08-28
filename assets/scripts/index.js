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

const DOM = (() => {
  const boardDiv = document.querySelector('#board');
  const messageSpan = document.querySelector('#message');
  const restartButton = document.querySelector('#restart-button');

  messageSpan.textContent = `Turn of ${Game.getCurrentPlayer().name} ${
    Game.getCurrentPlayer().mark
  }`;

  const renderBoard = () => {
    boardDiv.textContent = '';
    Board.getBoard().forEach((square, index) => {
      boardDiv.insertAdjacentHTML(
        'beforeend',
        `<div class="square" data-id="${index}">${square}</div>`
      );
    });
  };

  const handleBoardClick = event => {
    const clickedSquare = event.target;
    const clickedSquareId = clickedSquare.dataset.id;

    if (clickedSquare === boardDiv) {
      return;
    }

    if (clickedSquare.textContent !== '') {
      return;
    }

    if (Game.checkWinner(Board.getBoard()) || Game.checkTie()) {
      return;
    }

    clickedSquare.textContent = Game.getCurrentPlayer().mark;

    Board.markSquare(clickedSquareId);

    messageSpan.textContent = `Turn of ${Game.getCurrentPlayer().name} ${
      Game.getCurrentPlayer().mark
    }`;

    if (Game.checkWinner(Board.getBoard())) {
      Game.switchPlayer();
      messageSpan.textContent = `${Game.getCurrentPlayer().mark} ${
        Game.getCurrentPlayer().name
      } wins! 🎉`;
    }

    if (Game.checkTie()) {
      messageSpan.textContent = '👻🤝👽 We have a tie!';
    }
  };

  const handleRestartGame = () => {
    Game.restart();
    Game.resetCurrentPlayer();

    messageSpan.textContent = `Turn of ${Game.getCurrentPlayer().name} ${
      Game.getCurrentPlayer().mark
    }`;

    renderBoard();
  };

  const startGame = () => {
    renderBoard();
    boardDiv.addEventListener('click', handleBoardClick);
    restartButton.addEventListener('click', handleRestartGame);
  };

  return { startGame };
})();

DOM.startGame();
