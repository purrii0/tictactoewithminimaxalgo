import { useTicTacToe } from "./useTictactoe";
import "../App.css";

function TicTacToe() {
  const { board, xwin, owin, tie, handleClick, resetGame, getCellClass } =
    useTicTacToe();

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
