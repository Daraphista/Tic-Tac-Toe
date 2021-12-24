const Gameboard = (() => {
  const physicalBoard = [
    Array.from(document.querySelectorAll('.row0')),
    Array.from(document.querySelectorAll('.row1')),
    Array.from(document.querySelectorAll('.row2')),
  ];
  const getboardValues = () => {
    const boardValues = [[],[],[]]
    for(i = 0; i < 3; i++) {
      for(j = 0; j < 3; j++) {
        boardValues[i][j] = physicalBoard[i][j].firstChild.textContent;
      }
    }
    return boardValues;
  }
  const boardValues = getboardValues();
  const updatePhysicalBoard = () => {
    for(i = 0; i < 3; i++) {
      for(j = 0; j < 3; j++) {
        physicalBoard[i][j].firstChild.textContent = boardValues[i][j];
        if(boardValues[i][j] != '') {
          physicalBoard[i][j].style.pointerEvents = 'none';
        }
      }
    }
  }
  const evaluateWinner = (playerSymbol, opponentSymbol) => {
    for(let row = 0; row < 3; row++) {
      if(boardValues[row][0] == boardValues[row][1] && boardValues[row][1] == boardValues[row][2]) {
        if(boardValues[row][0] == playerSymbol) {
          return +10;
        } else if(boardValues[row][0] == opponentSymbol) {
          return -10;
        }
      }
    }

    for(let col = 0; col < 3; col++) {
      if(boardValues[0][col] == boardValues[1][col] && boardValues[1][col] == boardValues[2][col]) {
        if(boardValues[0][col] == playerSymbol) {
          return +10;
        } else if(boardValues[0][col] == opponentSymbol) {
          return -10;
        }
      }
    }

    if(boardValues[0][0] == boardValues[1][1] && boardValues[1][1] == boardValues[2][2]) {
      if(boardValues[0][0] == playerSymbol) {
        return +10;
      } else if(boardValues[0][0] == opponentSymbol) {
        return -10;
      }
    }
    if(boardValues[0][2] == boardValues[1][1] && boardValues[1][1] == boardValues[2][0]) {
      if(boardValues[0][2] == playerSymbol) {
        return +10;
      } else if(boardValues[2][0] == opponentSymbol) {
        return -10;
      }
    }

    return 0;
  }
  const displayResults = (playerSymbol, opponentSymbol) => {
    if(evaluateWinner(playerSymbol, opponentSymbol) == 10) {
      alert(`omg nanalo si ${playerSymbol}`);
      location.reload();
    } else if(evaluateWinner(playerSymbol, opponentSymbol) == -10) {
      alert(`omg nanalo si ${opponentSymbol}`);
      location.reload();
    } else if(boardValues.every(row => row.every(square => square !== ''))) {
      alert(`omg it's a draw`);
      location.reload();
    }
  }

  let selectedOption;
  let selection = 'Player';
  const dropUps = Array.from(document.querySelectorAll('.dropup'));
  window.addEventListener('click', (e) => {
    const selectionMenus = Array.from(document.querySelectorAll('.player'));
    selectionMenus.forEach(selectionMenu => {
      if(e.target.parentNode == selectionMenu || e.target.parentNode.parentNode == selectionMenu) {
        selectedOption = selectionMenu.firstElementChild;
        selectionMenu.classList.toggle('active');
      } else {
        selectionMenu.classList.remove('active');
      }
      dropUps.forEach(dropUp => {
        if(e.target.parentNode == dropUp) {
          selection = e.target.textContent;
        }
      })
    })
  })
  window.addEventListener('mouseover', (e) => {
    dropUps.forEach(dropUp => {
      if(e.target.parentNode == dropUp) {
        selectedOption.firstElementChild.textContent = e.target.textContent;    
      } else {
        selectedOption.firstElementChild.textContent = selection;
      }
    })
  })
  
  const Robot = (symbol) => {
    const easyBotMove = () => {
      let row = Math.floor(Math.random() * 3);
      let col = Math.floor(Math.random() * 3);

      if(boardValues[row][col] == '') {
        boardValues[row][col] = symbol;
      } else {
        easyBotMove();
      }
    };
    const hardBotMove = () => {
      let bestVal;
      bestVal = (symbol == 'x') ? 999 : -999;
      const isMax = (symbol == 'x') ? true : false;

      let bestRow = -1;
      let bestCol = -1;

      for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
          if(boardValues[i][j] == '') {
            boardValues[i][j] = symbol;
            let moveVal = _minimax(boardValues, 0, isMax, 'o', 'x' );
            boardValues[i][j] = '';

            if(moveVal > bestVal && symbol != 'x') {
              bestVal = moveVal;
              bestRow = i;
              bestCol = j;
            } 
            if(moveVal < bestVal && symbol == 'x') {
              bestVal = moveVal;
              bestRow = i;
              bestCol = j;
            }
          }
        }
      }

      boardValues[bestRow][bestCol] = symbol;
    };
    const _minimax = (boardValues, depth, isMax, playerSymbol, opponentSymbol) => {

      let score = evaluateWinner(playerSymbol, opponentSymbol)

      if(score == 10) {
        return score;
      }
      if(score == -10) {
        return score;
      }
      if(boardValues.every(row => row.every(square => square !== ''))) {
        return 0;
      }

      if(isMax) {
        let best = -999;
        for(let i = 0; i < 3; i++) {
          for(let j = 0; j < 3; j++) {
            if(boardValues[i][j] == '') {
              boardValues[i][j] = playerSymbol;
              best = Math.max(best, _minimax(boardValues, depth + 1, false, playerSymbol, opponentSymbol));
              boardValues[i][j] = '';
            }
          }
        }
        return best;
      } else {
        let best = 999;
        for(let i = 0; i < 3; i++) {
          for(let j = 0; j < 3; j++) {
            if(boardValues[i][j] == '') {
              boardValues[i][j] = opponentSymbol;
              best = Math.min(best, _minimax(boardValues, depth + 1, true, playerSymbol, opponentSymbol));
              boardValues[i][j] = '';
            }
          }
        }
        return best;
      }
    }
    return { easyBotMove, hardBotMove, symbol };
  }
  const Player = (symbol) => {
    const playerMove = (squareClicked) => {
      if(squareClicked.classList.contains('row0')) {
        boardValues[0][physicalBoard[0].indexOf(squareClicked)] = symbol;
        updatePhysicalBoard();
      } else if(squareClicked.classList.contains('row1')) {
        boardValues[1][physicalBoard[1].indexOf(squareClicked)] = symbol;
        updatePhysicalBoard();
      } else if(squareClicked.classList.contains('row2')) {
        boardValues[2][physicalBoard[2].indexOf(squareClicked)] = symbol;
        updatePhysicalBoard();
      }
    };

    return { playerMove };
  }

  const playerX = document.querySelector('.player.x .selected');
  const playerO = document.querySelector('.player.o .selected');

  window.addEventListener('click', () => {
    if(playerX.textContent.indexOf('Player') !== -1 && playerO.textContent.indexOf('Player') !== -1) {
      console.log('PvP');
    } else if(playerX.textContent.indexOf('Player') !== -1 && playerO.textContent.indexOf('Bot') !== -1) {
      console.log('PvB');
    } else if(playerX.textContent.indexOf('Bot') !== -1 && playerO.textContent.indexOf('Player') !== -1) {
      console.log('BvP');
    } else if (playerX.textContent.indexOf('Bot') !== -1 && playerO.textContent.indexOf('Bot') !== -1) {
      console.log('BvB');
    }

  })
})();
