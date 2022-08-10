import { ADD_PLAYERS, CLEAR_PLAYERS, IPlayerAction } from "../actions/playerAction";

export default function playersReducer(state=[], action:IPlayerAction){
    switch(action.type){
        case ADD_PLAYERS:
            return action.playerNames;
        case CLEAR_PLAYERS:
            return [];
        default:
            return state;
    }
}