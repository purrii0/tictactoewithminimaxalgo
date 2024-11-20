import { useState } from "react";

export function useTicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [play, setPlay] = useState("X");
  const [winner, setWinner] = useState(null);
  const [xwin, setXwin] = useState(0);
  const [owin, setOwin] = useState(0);
  const [tie, setTie] = useState(0);
  const [winningCombination, setWinningCombination] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [botTurn, isBotTurn] = useState(false);
  let newBoard;
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

  function handleClick(index) {
    if (board[index] || winner || gameOver) return;
    newBoard = [...board];
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
      setGameOver(true);
      setTimeout(() => resetGame(), 1000);
    } else if (newBoard.every((cell) => cell !== null)) {
      setTie((c) => c + 1);
      setWinningCombination([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      setGameOver(true);
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
    setGameOver(false);
  }

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

  return {
    board,
    xwin,
    owin,
    tie,
    handleClick,
    resetGame,
    getCellClass,
  };
}
