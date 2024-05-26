let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false; // Setting gameActive to false initially

let player1Name = '';
let player2Name = '';
let player1Wins = 0;
let player2Wins = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWinner = () => {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const checkDraw = () => {
  return !board.includes('');
};

const startGame = () => {
    player1Name = document.getElementById('player1').value;
    player2Name = document.getElementById('player2').value;
  
    document.getElementById('player1Name').textContent = player1Name;
    document.getElementById('player2Name').textContent = player2Name;
  
    document.getElementById('playerNames').style.display = 'none'; // Hide playerNames div
    document.getElementById('gameBoard').style.display = 'block'; // Display gameBoard div
    document.getElementById('pointsTable').style.display = 'block'; // Display pointsTable div
  
    gameActive = true;
    updateMessage(); // Update message initially
  };
  const updateMessage = () => {
    const playerName = currentPlayer === 'X' ? player1Name : player2Name;
    document.getElementById('message').innerText = `${playerName}'s turn`;
  };
  

  const handleClick = (index) => {
    if (!gameActive || board[index] !== '') return;
    const cell = document.getElementById('board').children[index];
    cell.innerText = currentPlayer;
  
    if (currentPlayer === 'X') {
      cell.style.backgroundColor = '#FF0000'; // Change color for X
    } else {
      cell.style.backgroundColor = '#47193b'; // Change color for O
    }
    board[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;
  
    const winner = checkWinner();
    if (winner) {
      const winningPlayerName = winner === 'X' ? player1Name : player2Name;
      document.getElementById('message').innerText = `${winningPlayerName} wins!`;
      if (winner === 'X') {
        player1Wins++;
        document.getElementById('player1Wins').innerText = player1Wins;
      } else {
        player2Wins++;
        document.getElementById('player2Wins').innerText = player2Wins;
      }
      gameActive = false;
    } else if (checkDraw()) {
      document.getElementById('message').innerText = `It's a draw!`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateMessage(); // Update message for next player's turn
    }
  };
  
const resetGame = () => {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  updateMessage();
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById('board').children[i];
    cell.innerText = '';
    cell.style.backgroundColor = '';
  }

  // Resetting the game status without affecting player names and data
  document.getElementById('playerNames').style.display = 'none';
  document.getElementById('gameBoard').style.display = 'block';
};
