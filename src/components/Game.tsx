import { useRef, useState } from "react";
import { useSelector } from "react-redux";

class Player {
    name:string;
    rollsScore:number[] = [];
    currentRoll:number;
    extraRolls:number[] = []

    constructor(name:string){
        this.name = name;
        for(let i = 0; i < 20; i++){
            this.rollsScore.push(-1);
        }
        this.currentRoll = 0;
        for(let i = 0; i < 2;i++){
            this.extraRolls.push();
        }
    }
}

function Game(){
    // use-states
    const playerNames = useSelector((state:{players:{value:string[]}})=>state.players.value as string[]);
    const [inputScore, setInputScore] = useState(0);
    const [role, setRole] = useState(0);
    const [disableNext, setDisableNext] = useState(false);
    const players = useRef((playerNames.map((name:string):Player=>{
        return new Player(name);
    })) as Player[]);
    const [isSecondRoll, setIsSecondRoll] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(true);


    // handlers
    const onInputScoreChange = (e:any)=>{
        const tgtVal = Number(e.target.value);
        const previousValue = Number(rollsScore[currentRoll-1]);
        if(!isNaN(tgtVal) && tgtVal <= 10 && tgtVal >= 0){
            if(((currentRoll + 1)%2 === 0 && (tgtVal + previousValue > 10))){
                setDisableNext(true);
            }else{
                setDisableNext(false);
            }
        }else{
            setDisableNext(true);
        }
        setInputScore(e.target.value);
    }

    const handleNextClick = ()=>{
        if(disableNext){
            return;
        }

        if(role === (players.current.length - 1) && currentRoll === (rollsScore.length - 2) && in){
            setDisableNext(true);
            setDisableSubmit(false);
        }

        players.current[role].rollsScore[currentRoll] = inputScore;
        players.current[role].currentRoll++;
        const nextPlayerIndex = (role + 1) % players.current.length;
        if((currentRoll+1) % 2 === 0){
            setRole(nextPlayerIndex);
        }else{
            if(Number(inputScore) === 10){
                if(currentRoll === rollsScore.length - 2){

                    return;
                }
                players.current[role].rollsScore[currentRoll + 1] = -1;
                players.current[role].currentRoll++;
                setRole(nextPlayerIndex);
            }else{
                setIsSecondRoll(!isSecondRoll);
            }
        }
    }

    // init component
    const playerScoreSheet = [];
    const {rollsScore, currentRoll} = players.current[role];
    for(let i = 0; i < 20;i+=2){
        playerScoreSheet.push(
            <tr>
                <th>Frame {(i+2)/2} </th>
                {[0,1].map((el)=><td className={i+el === currentRoll ? "selected" : ""}>{(rollsScore[i+el]) === -1 ? undefined : rollsScore[i+el]} {i+el === currentRoll && <input type="text" value={inputScore} onChange={onInputScoreChange} /> } </td>)}
            </tr>
        )
    }
 

    console.log(players.current[role]);

    return (
        <div className="game">

            <div className="sheet">
                <h2>Player: {players.current[role].name}</h2>
                <br/>
                <table>
                    <tbody>
                        {playerScoreSheet}
                    </tbody>
                </table>
                <div className="extra-rolls">
                    
                </div>
            </div>

            <div className="controller">
                <button disabled = {disableNext} onClick={handleNextClick}> Next </button>
                <button disabled = {disableSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Game;