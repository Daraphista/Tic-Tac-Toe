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
      let bestVal = -999;
      let bestRow = -1;
      let bestCol = -1;

      for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
          if(boardValues[i][j] == '') {
            boardValues[i][j] = symbol;
            let moveVal = _minimax(boardValues, 0, false, this, botX);
            boardValues[i][j] = '';
            console.log(moveVal);

            if(moveVal > bestVal) {
              bestVal = moveVal;
              bestRow = i;
              bestCol = j;
            }
          }
        }
      }
      
      boardValues[bestRow][bestCol] = symbol;
      console.log(bestCol, bestRow);
    };
    const _minimax = (boardValues, depth, isMax, player, opponent) => {

      let score = evaluateWinner(botO.symbol, botX.symbol)

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
              boardValues[i][j] = 'o';
              best = Math.max(best, _minimax(boardValues, depth + 1, !isMax));
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
              boardValues[i][j] = 'x';
              best = Math.min(best, _minimax(boardValues, depth + 1, true));
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
    const playerMove = () => {};
  }

  const updatePhysicalBoard = () => {
    for(i = 0; i < 3; i++) {
      for(j = 0; j < 3; j++) {
        physicalBoard[i][j].firstChild.textContent = boardValues[i][j];
      }
    }
  }
  const evaluateWinner = (player, opponent) => {
    for(let row = 0; row < 3; row++) {
      if(boardValues[row][0] == boardValues[row][1] && boardValues[row][1] == boardValues[row][2]) {
        if(boardValues[row][0] == player) {
          return +10;
        } else if(boardValues[row][0] == opponent) {
          return -10;
        }
      }
    }

    for(let col = 0; col < 3; col++) {
      if(boardValues[0][col] == boardValues[1][col] && boardValues[1][col] == boardValues[2][col]) {
        if(boardValues[0][col] == player) {
          return +10;
        } else if(boardValues[0][col] == opponent) {
          return -10;
        }
      }
    }

    if(boardValues[0][0] == boardValues[1][1] && boardValues[1][1] == boardValues[2][2]) {
      if(boardValues[0][0] == player) {
        return +10;
      } else if(boardValues[0][0] == opponent) {
        return -10;
      }
    }
    if(boardValues[0][2] == boardValues[1][1] && boardValues[1][1] == boardValues[2][0]) {
      if(boardValues[0][2] == player) {
        return +10;
      } else if(boardValues[2][0] == opponent) {
        return -10;
      }
    }

    return 0;
  }
  const displayResults = (player, opponent) => {
    if(evaluateWinner(botX.symbol, botO.symbol) == 10) {
      alert(`omg nanalo si X`);
      location.reload();
    } else if(evaluateWinner(botX.symbol, botO.symbol) == -10) {
      alert(`omg nanalo si O`);
      location.reload();
    } else if(boardValues.every(row => row.every(square => square !== ''))) {
      alert(`omg it's a draw`);
      location.reload();
    }
  }

  const botX = Robot('x');
  const botO = Robot('o');

  let moves = 0

  window.addEventListener('click', () => {
    if(moves % 2 == 0) {
      botX.easyBotMove();
    } else {
      // botO.easyBotMove();
      botO.hardBotMove();
    }
    moves++;
    setTimeout(() => {displayResults(botX, botO)}, 20)
    updatePhysicalBoard();
  })

})();
