import GameBoard from "./components/GameBoard"
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import Player from "./components/Player"
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { useState } from "react"

const PLAYER={
  "X":"Player 1",
  "O":"Player 2"
}
const INITIAL_GAME_BOARD=[[null,null,null],[null,null,null],[null,null,null]];

function getActivePlayer(gameTurns)
{
  let currentPlayer="X";
  if(gameTurns.length>0 && gameTurns[0].player==="X")
  {
    currentPlayer="O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard,players)
{
  let winner;
 for(const combination of WINNING_COMBINATIONS)
 {
  const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

  if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol)
  {
     winner = players[firstSquareSymbol];
  }
 }
 return winner;
}

function deriveGameBoard(gameTurns)
{
  
  let  gameBoard=[...INITIAL_GAME_BOARD.map(array=>[...array])];
 
  for(const turn of gameTurns)
  {
      const {square, player}=turn;
      const {row, col}=square;
      gameBoard[row][col]=player;
  }

  return gameBoard;
}

function App() {
  // const [activePlayer, setActivePlayer]=useState("X");
  const [gameTurns, setGameTurns]=useState([]);
  const [players, setPlayers]=useState(PLAYER)


 let activePlayer=getActivePlayer(gameTurns);
 const gameBoard=deriveGameBoard(gameTurns);
 const winner=deriveWinner(gameBoard,players);
 
 const hasDraw= (gameTurns.length===9 && !winner);
 function handleRematch()
 {
   setGameTurns([]);
 }

  function handleSelectSquare(rowIndex,colIndex)
  {

    
    // setActivePlayer((prevPlayer)=> (prevPlayer==="X")? "O":"X");
    setGameTurns((prevTurns)=> {
     
      let currentPlayer=getActivePlayer(prevTurns);
    let updatedTurns=[{square: {row: rowIndex , col: colIndex}, player: currentPlayer},...prevTurns]

    return updatedTurns;
  })

 
  }

  function handlePlayerNameChange(symbol, newName)
  {
    setPlayers((prevPlayers)=>
    { return{
      ...prevPlayers,
      [symbol]:newName
    }})
  }

  return (
    <main>
      <div id="game-container">
       <ol id="players" className="highlight-player">
       <Player name={PLAYER.X} symbol="X" isActive={activePlayer==="X"} onChangeName={handlePlayerNameChange}></Player>
       <Player name={PLAYER.O} symbol="O" isActive={activePlayer==="O"} onChangeName={handlePlayerNameChange}/>
       </ol>
       
       {(winner||hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
       <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
    <Log turns={gameTurns}/>
    </main>
  )
}

export default App
