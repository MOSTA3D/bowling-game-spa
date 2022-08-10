export const SET_WINNER = "SET_WINNER";

interface IWinnerData{
    name:string;
    score:number;
}

export interface ISetWinnerAction{
    type: string;
    winnerData:IWinnerData
}

export function setWinner(winnerData:IWinnerData){
    return{
        type: SET_WINNER,
        winnerData
    }
}