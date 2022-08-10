export const CLEAR_PLAYERS = "CLEAR_PLAYERS";
export const ADD_PLAYERS = "ADD_PLAYERS";

export interface IPlayerAction{
    type: string;
    playerNames: string[]
}

export function addPlayers(playersNames:string[]){
    return {
        type: ADD_PLAYERS,
        playersNames
    }
}