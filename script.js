const gameBoard = (() => {
  const squares = Array.from(document.getElementsByClassName('square'));
  console.log(squares);
  
  const Player = (symbol, isBot) => {
    return { symbol, isBot };
  }
  
  const playerX = Player('x', false);
  const playerO = Player('o', true);

  document.querySelector('h1').textContent = `Player ${playerX.symbol.toUpperCase()}'s turn`;
  
  const round = () => {
    let moves = 0;
    squares.forEach(square => {
      square.addEventListener('click', () => {
        // playerMove(square, moves);
        playerVsBot(square, moves);
      })
      if(!square.firstChild.textContent === '') {
        square.style.pointerEvents = 'none';
      }
    }
    )

  };

    
    const playerMove = (square, moves) => {    
      if(moves  % 2 == 0) {
        document.querySelector('h1').textContent = `Player ${playerO.symbol.toUpperCase()}'s turn`;
        square.firstChild.textContent = playerX.symbol;
        console.log('haha');
      } else {
        document.querySelector('h1').textContent = `Player ${playerX.symbol.toUpperCase()}'s turn`;
        square.firstChild.textContent = playerO.symbol;
      }
      
      square.style.pointerEvents = 'none';
    }

    const playerVsBot = (square, moves) => {
      if(moves  % 2 == 0) {
        document.querySelector('h1').textContent = `Player ${playerO.symbol.toUpperCase()}'s turn`;
        square.firstChild.textContent = playerX.symbol;

          compMove(squares, playerO.symbol);

      } else {
        document.querySelector('h1').textContent = `Player ${playerX.symbol.toUpperCase()}'s turn`;
      }
      moves++;
      square.style.pointerEvents = 'none';
      displayResult();
    }
    
    const displayResult = () => {
      if(checkWin(playerO.symbol)) {
        setTimeout(function() {
          alert(`${playerO.symbol} wins!`);
          location.reload();
        }, 20);
      } else if(checkWin(playerX.symbol)) {
        setTimeout(function() {
          alert(`${playerX.symbol} wins!`);
          location.reload();
        }, 20);
      } else if(checkDraw(squares)) {
        setTimeout(function() {
          alert('it\'s a draw!');
          location.reload();
        }, 20);
      }
    }
    
    const checkWin = (symbol) => {
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
    
    const checkDraw = (squares) => {
      return squares.every(
        function(squares) {
          return squares.firstChild.textContent !== '';
        }
        )
      }
      
    const allChecked = (square, symbol) => {
      return square.every(
        function(square) {
          return squares[square].textContent === symbol;
        }
        )
      }

    const compMove = (squares, symbol) => {
      let square = Math.floor(Math.random() * 10);
      console.log(squares[square].firstChild.textContent === '');
      console.log(square);
      if(squares[square].firstChild.textContent === '') {
        squares[square].firstChild.textContent = symbol;
        squares[square].style.pointerEvents = 'none';
      } else {
        compMove(squares, symbol);
      }
    }
        
  round();

})();