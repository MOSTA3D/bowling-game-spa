import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { fetchResults } from "../slices/winnerSlice";

import { mapPlayers, Player } from "../utils/helper";



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

    // navigator
    const navigatTo = useNavigate();

    // redux
    const dispatch = useDispatch();

    // globally used
    const playerScoreSheet = [];
    const {rollsScore, currentRoll} = players.current[role];

    // helper functions
    function isLastPlayer(r:number):boolean{
        return (r+1) % players.current.length === 0;
    }

    // handlers
    const onInputScoreChange = (e:any)=>{
        const tgtVal = Number(e.target.value);
        const previousValue = Number(rollsScore[currentRoll-1]);

        // validation
        if(isNaN(tgtVal) || tgtVal > 10 || tgtVal < 0 || (((currentRoll + 1) % 2) === 0 && (tgtVal + previousValue) > 10)){
            setDisableNext(true);
        }else{
            
            const ifTen = rollsScore[18] + rollsScore[19];
            if(currentRoll !== 20 && ifTen !== 10 ){
                setDisableNext(false);
            }

            // edgecase-1 : handle last roll
            if(currentRoll === 19){
                
                if(tgtVal + previousValue === 10){
                    setDisableNext(false);
                    setDisableSubmit(true);
                }else{
                    setDisableNext(true);
                    setDisableSubmit(false);
                }
            }
        }

        setInputScore(e.target.value);
    }

    const handleNextClick = ()=>{
        if(disableNext){
            return;
        }

        setInputScore(0);

        players.current[role].rollsScore[currentRoll] = Number(inputScore);
        players.current[role].currentRoll++;
        const nextPlayerIndex = (role + 1) % players.current.length;

        // handle even cells
        if((currentRoll+1) % 2 === 0){

            if(currentRoll === 19 && (players.current[role].rollsScore[currentRoll - 1] + Number(inputScore)) === 10 ){

                players.current[role].isExtra = true;

                if((role+1) % players.current.length === 0){
                    setDisableNext(true);
                    setDisableSubmit(false);
                }
               
                return;
            }

            if(role === nextPlayerIndex){
                setIsSecondRoll(!isSecondRoll);
            }

            setRole(nextPlayerIndex);
            
        }
        // handle odd cells
        else{

            // edgecase-1 : last extra cell
            if((currentRoll + 1) === (players.current[role].isExtra ? 21 : 19) && isLastPlayer(role)){
                setDisableNext(true);
                setDisableSubmit(false);
                // return;
            }

            
            if(rollsScore[currentRoll - 1] + rollsScore[currentRoll - 2] === 10 && !isLastPlayer(role)){
                setRole(nextPlayerIndex);
                return;
            }

            if(Number(inputScore) === 10){

                // edge case-1 : first extra cell
                if(currentRoll === 20){

                    setIsSecondRoll(!isSecondRoll);
                    return;
                }

                // normal behavior
                players.current[role].rollsScore[currentRoll + 1] = 0;
                players.current[role].currentRoll++;
                
                // edgecase-2 : last-frame first-cell
                if(currentRoll === 18){
                    players.current[role].isExtra = true;
                    setDisableNext(false);
                    setDisableSubmit(true);
                    setIsSecondRoll(!isSecondRoll);
                    return;
                }

                // normal behavior
                if(currentRoll !== 20)
                 setRole(nextPlayerIndex);
            }else{
                setIsSecondRoll(!isSecondRoll);
            }
        }
    }

    const handleSubmitClick = ()=>{
        if(disableSubmit) return;

        console.log("submit");

        players.current[role].rollsScore[currentRoll] = Number(inputScore);

        const mappedPlayers = mapPlayers(players.current);;

        dispatch((fetchResults as any)(mappedPlayers));

        navigatTo("/results");
    }


    // init component
    for(let i = 0; i < 20;i+=2){
        playerScoreSheet.push(
            <tr key={i}>
                <th>Frame {(i+2)/2} </th>
                {[0,1].map((el)=><td key={el} className={i+el === currentRoll ? "selected" : ""}>{(rollsScore[i+el]) === 0 ? undefined : rollsScore[i+el]} {i+el === currentRoll && <input autoFocus type="text" value={inputScore} onChange={onInputScoreChange} /> } </td>)}
            </tr>
        )
    }
 


    return (
        <div className="game">

            <div className="sheet">
                <h2>Player: {players.current[role].name}</h2>
                <br/>
                <table>
                    <tbody>
                        {playerScoreSheet}
                        <tr className={!players.current[role].isExtra ? "hide" : ""}>
                            <th>Extra</th>
                            {[20, 21].map(el=><td key={el} className={el === currentRoll ? "selected" : ""}>{(rollsScore[el]) === 0 ? undefined : rollsScore[el]} {el === currentRoll && <input autoFocus type="text" value={inputScore} onChange={onInputScoreChange} /> } </td>)}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="controller">
                <button className = {disableNext ? "" : "green-button"} disabled = {disableNext} onClick={handleNextClick}> Next </button>
                <button className = {disableSubmit ? "" : "red-button"} disabled = {disableSubmit} onClick={handleSubmitClick}>Submit</button>
            </div>

        </div>
    )
}

export default Game;