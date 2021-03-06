import {useEffect , useState} from 'react'
import './App.css';
import {gameSubject,initGame,resetGame} from "./Game";
import Board from "./Board";

function App() {
  const [ board, setBoard] = useState([])
  const [isGameOver , setIsGameOver] = useState()
  const [ result , setResult] = useState()
  useEffect(()=>{
    initGame()
    const subscribe = gameSubject.subscribe(
      game => { setBoard(game.board)
                setIsGameOver(game.isGameOver)
                setResult(game.result)
              } 
    )
     return ()=> subscribe.unsubscribe()
  },[])

  return (
    <div className="container">
      {isGameOver && (
        <h2 className="text">
            Game Over
            <button onClick={resetGame()}><span className="text">New Game</span></button>
        </h2>
      )}
      <div className="board_container">
        <Board board={board}/>
      </div>
      {result && <p className="text">{result}</p>}
    </div>
  );
}

export default App;
