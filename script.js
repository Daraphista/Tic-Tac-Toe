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

  const playerSelection = (() => {
    const playerXMenu = document.querySelector('.player.x');
    const playerOMenu = document.querySelector('.player.o');

    const functionality = (playerMenu) => {
      const playerMenuSymbol = Array.from(playerMenu.classList)[1]
      let selection = localStorage.getItem(`${playerMenuSymbol}selection`) ? localStorage.getItem(`${playerMenuSymbol}selection`) : 'Player';
      const selected = playerMenu.firstElementChild.firstElementChild;
      selected.textContent = selection;

      playerMenu.addEventListener('click', (e) => {
        playerMenu.classList.toggle('active');
        if(e.target.parentNode.classList.contains('dropup')) {
          localStorage.setItem(`${playerMenuSymbol}selection`, e.target.textContent);
          location.reload();
        }
      })
      window.addEventListener('click', (e) => {
        if(e.target.parentNode !== playerMenu 
        && e.target.parentNode.parentNode !== playerMenu) {
          playerMenu.classList.remove('active');
        }
      })
      playerMenu.addEventListener('mouseover', (e) => {
        if(e.target.parentNode.classList.contains('dropup')) {
          selected.textContent = e.target.textContent;
        } else {
          selected.textContent = selection;
        }
      })
    }

    functionality(playerXMenu);
    functionality(playerOMenu);
  })();
  
  const Robot = (symbol) => {
    const easyBotMove = () => {
        let row = Math.floor(Math.random() * 3);
        let col = Math.floor(Math.random() * 3);

        if(boardValues[row][col] == '') {
          boardValues[row][col] = symbol;
          console.log(row, col, boardValues[row][col])
          updatePhysicalBoard();
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
      updatePhysicalBoard();
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

    return { playerMove, symbol };
  }

  let playerXSelection = localStorage.getItem('xselection') ? localStorage.getItem(`xselection`) : 'Player';
  let playerOSelection = localStorage.getItem('oselection') ? localStorage.getItem(`oselection`) : 'Player';

  const playerVsPlayer = () => {
    const playerX = Player('x');
    const playerO = Player('o');
    
    let moves = 0;
    window.addEventListener('click', (e) => {
      if(moves % 2 == 0) {
        playerX.playerMove(e.target);
      } else {
        playerO.playerMove(e.target);
      }
      setTimeout(() => {displayResults(playerX.symbol, playerO.symbol)}, 20)
      if(e.target.classList.contains('square')) {moves++;}
    })
  }
  const playerVsBot = (firstPlayer, bot) => {
    if(firstPlayer == 'player') {
      const playerX = Player('x');
      const playerO = Robot('o');

      window.addEventListener('click', (e) => {
        if(e.target.classList.contains('square')) { 
          setTimeout(() => {displayResults(playerX.symbol, playerO.symbol)}, 20);
          playerX.playerMove(e.target);
          if(bot.indexOf('Hard') !== -1) {playerO.hardBotMove()}
          if(bot.indexOf('Easy') !== -1) {playerO.easyBotMove()}
        }
      })
    } else if(firstPlayer == 'bot') {
      const playerX = Robot('x');
      const playerO = Player('o');

      window.addEventListener('load', () => {
        playerX.easyBotMove();
      })
      window.addEventListener('click', (e) => {
        if(e.target.classList.contains('square')) { 
          playerO.playerMove(e.target);
          setTimeout(() => {displayResults(playerX.symbol, playerO.symbol)}, 20);
          if(bot.indexOf('Hard') !== -1) {playerX.hardBotMove()}
          if(bot.indexOf('Easy') !== -1) {playerX.easyBotMove()}
        }
      })
    }
  }
  const botVsBot = (botX, botO) => {
    const playerX = Robot('x');
    const playerO = Robot('o');
    window.addEventListener('load', () => {
      for(i = 1; i <= 9; i++) {
        if(i % 2 !== 0) {
          setTimeout(() => {
            if(evaluateWinner(playerX.symbol, playerO.symbol) == 0) {
              if(botX.indexOf('Hard') !== -1) {playerX.hardBotMove()}
              if(botX.indexOf('Easy') !== -1) {playerX.easyBotMove()}
              setTimeout(() => {displayResults(playerX.symbol, playerO.symbol)}, 20)
            }
          }, i*1000)
        } else {
          setTimeout(() => {
            if(evaluateWinner(playerX.symbol, playerO.symbol) == 0) {
              if(botO.indexOf('Hard') !== -1) {playerO.hardBotMove()}
              if(botO.indexOf('Easy') !== -1) {playerO.easyBotMove()}
              setTimeout(() => {displayResults(playerX.symbol, playerO.symbol)}, 20)
            }
          }, i*1000)
        }
      }
    })
  }
  
  if(playerXSelection == 'Player' && playerOSelection == 'Player') {
    console.log('PvP')
    playerVsPlayer();
  } else if(playerXSelection == 'Player' && playerOSelection.indexOf('Bot') !== -1) {
    console.log('PvE');
    playerVsBot('player', playerOSelection);
  } else if(playerXSelection.indexOf('Bot') !== -1 && playerOSelection.indexOf('Player') !== -1) {
    playerVsBot('bot', playerXSelection)
  } else if(playerXSelection.indexOf('Bot') !== -1 && playerOSelection.indexOf('Bot') !== -1) {
    console.log('EvE');
    botVsBot(playerXSelection, playerOSelection);
  }    
})();
