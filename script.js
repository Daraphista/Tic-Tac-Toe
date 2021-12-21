const gameBoard = (() => {

  const Player = (symbol, isBot) => {
    const isWinner = () => {
      if(allChecked([0, 1, 2], symbol) 
      || allChecked([3, 4, 5], symbol) 
      || allChecked([6, 7, 8], symbol) 
      || allChecked([0, 3, 6], symbol) 
      || allChecked([1, 4, 7], symbol) 
      || allChecked([2, 5, 8], symbol)
      || allChecked([0, 4, 8], symbol)
      || allChecked([2, 4, 6], symbol)) {
        return true
      } else {
        return false
      }
    }
    return { symbol, isBot, isWinner };
  }

  const playerX = Player('x', true);
  const playerO = Player('o', true);

  moves = 0;
  window.addEventListener('click', () => {
    round(moves);
    moves++;
    console.log(playerO.isWinner());
    displayResult();
  })
  
  const squareArray = ['', '', '', '', '', '', '', '', ''];
  const squarePhysical = Array.from(document.querySelectorAll('.square'))
  
  function round(moves) {
    if(moves % 2 == 0) {
      compMove(squareArray, 'x');
    } else {
      compMove(squareArray, 'o');
    }
    displayMoves(squarePhysical, squareArray);
  }
  
  function displayMoves(squarePhysical, squareArray) {
    for(i = 0; i < 9; i++) {
      squarePhysical[i].firstChild.textContent = squareArray[i];
    }
  }
  
  function compMove(squares, symbol) {
    let index = Math.floor(Math.random() * 10)
    if (squares[index] === '') {
      squares[index] = symbol;
    } else {
      compMove(squares, symbol);
    }
  }
  
  function allChecked(winConditions, symbol) {
    return winConditions.every(
      function(winConditions) {
        return squarePhysical[winConditions].firstChild.textContent === symbol;
      }
      )
    }  
    
  function isDraw(squares) {
    return squares.every(
      function(square) {
        return square !== ''
      }
      )
    }
    
  function displayResult() {
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
    } else if(isDraw(squareArray)) {
      setTimeout(function() {
        alert('It\'s a draw!');
        location.reload();
      }, 20);
    }
  }

})();