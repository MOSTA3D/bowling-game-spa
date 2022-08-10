import { createSlice } from "@reduxjs/toolkit";
import playersReducer from "../reducers/playersReducer";

const initialState:string[] = [];

export const playersSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        addPlayers:(state, action)=>{
            state.concat(action.payload);
        },
        clearPlayers: (state)=>{
            state = [] as string[];
        }
    }
})

export const {addPlayers, clearPlayers} =  playersSlice.actions;

export default playersSlice.reducer;