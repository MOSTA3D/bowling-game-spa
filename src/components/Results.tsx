import { useSelector } from "react-redux";
import { IPlayerResult } from "../utils/helper";

import Error from "./Error";

function Results(){
    const playerResults = useSelector((state)=>(state as any).playerResults.value as IPlayerResult[]);
    const players = playerResults ? [...playerResults] : [];
    const winner = players.shift() as IPlayerResult;
    return (
         (
            <div className="results">
            <main className="winner">
                <h1>Results</h1>
                <br/><br/>
                <h1>And The Winner Is &lt; <span className="winner-name">{winner?.name}</span> /&gt;</h1>
                <h2>Score : {winner?.score}</h2>
                
                {winner?.perfect && (
                    <h2>Woow, A Perfect Game</h2>
                )}
            </main>
            <aside>
                <ul>
                    {players.map(el=>(
                        <li>
                            <h3>{el.name} : {el.score}</h3>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
        )
        
    )
}

export default Results;