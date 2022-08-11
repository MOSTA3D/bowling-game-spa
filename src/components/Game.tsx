import { useRef, useState } from "react";
import { useSelector } from "react-redux";

class Player {
    name:string;
    rollsScore:number[] = [];
    currentRoll:number;
    extraRolls:number[] = []

    constructor(name:string){
        this.name = name;
        for(let i = 0; i < 22; i++){
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
    const [displayExtra, setDisplayExtra] = useState(false);


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

        if(tgtVal + players.current[role].rollsScore[currentRoll - 1] === 10){
            setDisableNext(false);
            setDisableSubmit(true);
        }

        setInputScore(tgtVal);
    }

    const handleNextClick = ()=>{
        if(disableNext){
            return;
        }

        if(role === (players.current.length - 1) && currentRoll === (rollsScore.length - 2) && inputScore !== 10){
            setDisableNext(true);
            setDisableSubmit(false);
        }


        players.current[role].rollsScore[currentRoll] = inputScore;
        players.current[role].currentRoll++;
        const nextPlayerIndex = (role + 1) % players.current.length;
        if((currentRoll+1) % 2 === 0){
            setRole(nextPlayerIndex);
            
            if(currentRoll === 19 && (inputScore + players.current[role].rollsScore[currentRoll]) === 10){
                setDisplayExtra(true);
            }

        }else{
            if(Number(inputScore) === 10){
                if(currentRoll >= rollsScore.length - 2){
                    players.current[role].rollsScore[currentRoll] = inputScore;
                    players.current[role].currentRoll++;

                    if(currentRoll === 20){
                        setRole(nextPlayerIndex);
                    }

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
                        <tr className={displayExtra ? "display" : ""}>
                            <th>Extra</th>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className="extra-rolls">
                    <span></span>
                    <span></span>
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