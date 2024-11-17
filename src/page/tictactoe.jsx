import { useEffect, useState } from "react";
import "../App.css";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [play, setPlay] = useState("X");
  const [winner, setWinner] = useState(null);
  const [xwin, setXwin] = useState(0);
  const [owin, setOwin] = useState(0);
  const [tie, setTie] = useState(0);
  const [winningCombination, setWinningCombination] = useState([]);

  const sendStateToPython = (state) => {
    fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((data) => console.log("State updated on Python server:", data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    sendStateToPython({ board });
  }, [board]);

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
      setPlay(play === "X" ? "O" : "X");
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
          {board.map((cell, index) => {
            return (
              <div
                key={index}
                className={getCellClass(index)}
                onClick={() => handleClick(index)}
              >
                {cell}
              </div>
            );
          })}
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
