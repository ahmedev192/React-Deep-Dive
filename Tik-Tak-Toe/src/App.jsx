import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { useState } from "react";

const PLAYER = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = Array(3).fill(Array(3).fill(null));

const getActivePlayer = (gameTurns) =>
  gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";

const deriveWinner = (gameBoard, players) => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination.map(
      ({ row, column }) => gameBoard[row][column]
    );
    if (a && a === b && a === c) return players[a];
  }
  return null;
};

const deriveGameBoard = (gameTurns) => {
  const gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);
  gameTurns.forEach(({ square: { row, col }, player }) => {
    gameBoard[row][col] = player;
  });
  return gameBoard;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYER);

  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleRematch = () => setGameTurns([]);

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => [
      {
        square: { row: rowIndex, col: colIndex },
        player: getActivePlayer(prevTurns),
      },
      ...prevTurns,
    ]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newName }));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
