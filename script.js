const gameBoard = (() => {
  const squares = Array.from(document.getElementsByClassName('square'));
  console.log(squares);
  
  const Player = (symbol) => {
    return { symbol };
  }
  
  const playerX = Player('x');
  const playerO = Player('o');

  let rounds = 0;
  squares.forEach(square => square.addEventListener('click', () => {
    if(rounds % 2 != 0) {
      square.firstChild.textContent = playerX.symbol;
    } else {
      square.firstChild.textContent = playerO.symbol;
    }
    rounds++;

    square.style.pointerEvents = 'none';

    if(allChecked([0, 1, 2], playerO.symbol) 
    || allChecked([3, 4, 5], playerO.symbol) 
    || allChecked([6, 7, 8], playerO.symbol) 
    || allChecked([0, 3, 6], playerO.symbol) 
    || allChecked([1, 4, 7], playerO.symbol) 
    || allChecked([2, 5, 8], playerO.symbol)
    || allChecked([0, 4, 8], playerO.symbol)
    || allChecked([2, 4, 6], playerO.symbol)) {
      setTimeout(function() {
        alert(`${playerO.symbol} wins!`);
        location.reload();
      }, 100);
    } else if(allChecked([0, 1, 2], playerX.symbol) 
    || allChecked([3, 4, 5], playerX.symbol) 
    || allChecked([6, 7, 8], playerX.symbol) 
    || allChecked([0, 3, 6], playerX.symbol) 
    || allChecked([1, 4, 7], playerX.symbol) 
    || allChecked([2, 5, 8], playerX.symbol)
    || allChecked([0, 4, 8], playerX.symbol)
    || allChecked([2, 4, 6], playerX.symbol)) {
      setTimeout(function() {
        alert(`${playerX.symbol} wins!`);
        location.reload();
      }, 100);
    }

    if(displayDraw(squares)) {
      alert('it\'s a draw!');
    }

  }))

    const displayDraw = (squares) => {
      return squares.every(
        function(squares) {
          return squares.firstChild.textContent !== '';
        }
      )
    }

    const allChecked = (winConditions, symbol) => {
      return winConditions.every(
        function(winConditions) {
          return squares[winConditions].textContent === symbol;
        }
      )
    }

})();