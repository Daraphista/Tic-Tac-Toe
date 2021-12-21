const gameBoard = (() => {
  const squareArray = ['', '', '', '', '', '', '', '', ''];
  const squarePhysical = Array.from(document.querySelectorAll('.square'))
  
  const playGame = () => {
    moves = 0;
    window.addEventListener('click', () => {
      _round(moves);
      moves++;
      displayResult();
    })
  }

  const _round = (moves) => {
    if(moves % 2 == 0) {
      _compMove(squareArray, 'x');
    } else {
      _compMove(squareArray, 'o');
    }
    _displayMoves(squarePhysical, squareArray);
  }
  
  const _displayMoves = (squarePhysical, squareArray) => {
    for(i = 0; i < 9; i++) {
      squarePhysical[i].firstChild.textContent = squareArray[i];
    }
  }
  
  const _compMove = (squares, symbol) => {
    let index = Math.floor(Math.random() * 10)
    if (squares[index] === '') {
      squares[index] = symbol;
    } else {
      _compMove(squares, symbol);
    }
  }
  
  const allChecked = (winConditions, symbol) => {
    return winConditions.every(
      function(winConditions) {
        return squarePhysical[winConditions].firstChild.textContent === symbol;
      }
      )
  }  
    
  const _isDraw = (squares) => {
    return squares.every(
      function(square) {
        return square !== ''
      }
      )
  }
    
  const displayResult = () => {
    console.log('lmao');
    if(playerX.isWinner()) {
      setTimeout(function() {
        alert('X wins!');
        location.reload();
      }, 20);
    } else if(playerO.isWinner()) {
      setTimeout(function() {
        alert('O wins!');
        location.reload();
      }, 20);
    } else if(_isDraw(squareArray)) {
      setTimeout(function() {
        alert('It\'s a draw!');
        location.reload();
      }, 20);
    }
  }

  return { playGame, allChecked, displayResult };
})();

const Player = (symbol, isBot) => {
  const isWinner = () => {
    if(gameBoard.allChecked([0, 1, 2], symbol) 
    || gameBoard.allChecked([3, 4, 5], symbol) 
    || gameBoard.allChecked([6, 7, 8], symbol) 
    || gameBoard.allChecked([0, 3, 6], symbol) 
    || gameBoard.allChecked([1, 4, 7], symbol) 
    || gameBoard.allChecked([2, 5, 8], symbol)
    || gameBoard.allChecked([0, 4, 8], symbol)
    || gameBoard.allChecked([2, 4, 6], symbol)) {
      return true
    } else {
      return false
    }
  }
  return { symbol, isBot, isWinner };
}

const playerX = Player('x', true);
const playerO = Player('o', true);

gameBoard.playGame();