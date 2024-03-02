import { WINNING_COMBINATIONS } from "./winning-combinations.js"

import GameOver from "./components/GameOver.jsx"
import Log from "./components/Log.jsx"
import { useState } from "react"
import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"


const initiGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveBoardGame(gameTurns) {
  let gameBoard = [...initiGameboard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}


function derivedWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }

  }
  return winner;
}

function derivedActivatedPlayer(asd) {
  let currentPlayer = 'X';
  if (asd.length > 0 && asd[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}


function App() {      //idhar toh deklhiya tha naa ki App ek function hai

  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });

  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = deriveBoardGame(gameTurns);
  const activePlayer = derivedActivatedPlayer(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {

      const currentPlayer = derivedActivatedPlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns
      ];

      return updatedTurns;
    }
    );
  }

  function handleRematch() {
    setGameTurns([]);
  }


  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className="highlight-player">
          <Player initalName='Player 1' symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initalName='Player 2' symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />

      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
