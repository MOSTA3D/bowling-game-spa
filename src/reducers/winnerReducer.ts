import { SET_WINNER, setWinner, ISetWinnerAction } from "../actions/winnerAction";

export default function winnerReducer(state={}, action:ISetWinnerAction){
    switch(action.type){
        case SET_WINNER:
            return action.winnerData;
        default:
            return state;
    }
}