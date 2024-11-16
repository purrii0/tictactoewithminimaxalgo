import { useState } from "react";
import "../App.css";
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [play, setPlay] = useState("X");
  const [winner, setWinner] = useState(null);
  const [xwin, setXwin] = useState(0);
  const [owin, setOwin] = useState(0);
  const [tie, setTie] = useState(0);
  const [winningCombination, setWinningCombination] = useState([]);

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = play;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner.winner);
      setWinningCombination(gameWinner.combination);
      if (gameWinner.winner === "X") {
        setXwin((c) => c + 1);
      } else {
        setOwin((c) => c + 1);
      }
      setTimeout(() => resetGame(), 1000);
    } else if (newBoard.every((cell) => cell !== null) && !gameWinner) {
      setTie((c) => c + 1);
      setWinningCombination([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      setTimeout(() => resetGame(), 1000);
    } else {
      setPlay(play == "X" ? "O" : "X");
    }
  }
  function resetGame() {
    setBoard(Array(9).fill(null));
    setWinningCombination([]);
    setWinner(null);
    setPlay("X");
  }

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  function checkWinner(board) {
    for (let [a, b, c] of winConditions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combination: [a, b, c] };
      }
    }
    return null;
  }
  function getCellClass(index) {
    if (winningCombination.includes(index)) return "winning-cell";
  }
  return (
    <>
      <div className="container">
        <div className="box">
          <div className={getCellClass(0)} onClick={() => handleClick(0)}>
            {board[0]}
          </div>
          <div className={getCellClass(1)} onClick={() => handleClick(1)}>
            {board[1]}
          </div>
          <div className={getCellClass(2)} onClick={() => handleClick(2)}>
            {board[2]}
          </div>
          <div className={getCellClass(3)} onClick={() => handleClick(3)}>
            {board[3]}
          </div>
          <div className={getCellClass(4)} onClick={() => handleClick(4)}>
            {board[4]}
          </div>
          <div className={getCellClass(5)} onClick={() => handleClick(5)}>
            {board[5]}
          </div>
          <div className={getCellClass(6)} onClick={() => handleClick(6)}>
            {board[6]}
          </div>
          <div className={getCellClass(7)} onClick={() => handleClick(7)}>
            {board[7]}
          </div>
          <div className={getCellClass(8)} onClick={() => handleClick(8)}>
            {board[8]}
          </div>
        </div>
        <button className="btn" onClick={resetGame}>
          Reset
        </button>
        <div className="table">
          <table>
            <tbody>
              <tr className="top">
                <td>X</td>
                <td>Tie</td>
                <td>O</td>
              </tr>
              <tr className="bottom">
                <td>{xwin}</td>
                <td>{tie}</td>
                <td>{owin}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default TicTacToe;
