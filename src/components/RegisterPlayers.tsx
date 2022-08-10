import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addPlayers } from "../slices/playersSlice";

function RegisterPlayers(){
    const [players, setPlayers]:[never[]|string[], Dispatch<SetStateAction<never[]|string[]>>] = useState([] as string[]);
    const [playerName, setPlayerName] = useState("");

    const dispatch = useDispatch();

    const navigatTo = useNavigate();
    
    const handlePlayerNameChange = (e:React.FormEvent<HTMLInputElement>)=>{
        setPlayerName(e.currentTarget.value);
    }

    const handleAddPlayer = ():void=>{
        if(players.includes(playerName)){
            return;
        }
        setPlayers((ps)=>[...ps, playerName]);
    };

    const handlePlayerRemove = (e:any)=>{
        setPlayers((oldPlayers)=>{
            const tempArr = [...oldPlayers];
            tempArr.splice(Number(e.target.dataset.player), 1);
            return [...tempArr];
        })
    }

    // console.log(useSelector(state=>console.log(state)));

    const handleStartGame = ()=>{
        dispatch(addPlayers(players));
        navigatTo("/game");
    }

    return(
        <div className="register-players">
            <header className="register-header">
                <input type="text" name="player-name" value={playerName} onChange={handlePlayerNameChange} placeholder="Enter Player Name"/>
                <div className="register-controls">
                    <button onClick = {handleAddPlayer} className="add-player">
                        Add Player
                    </button>
                    <button className="start-game" onClick={handleStartGame}>
                        Start
                    </button>
                </div>
            </header>
            <ul>
                {players.map((name, i)=>(
                    <li key={name}>
                        {name}
                        <button onClick={handlePlayerRemove} data-player={i}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RegisterPlayers;