import { createSlice } from "@reduxjs/toolkit";
import playersReducer from "../reducers/playersReducer";

const initialState = {
    value: [] as string[]
};

export const playersSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        addPlayers:(state, action)=>{
            console.log("addPlayers triggered..");
            const tempArr = [...state.value, ...action.payload];
            console.log(tempArr);
            state.value = tempArr;
            console.log(state);
        },
        clearPlayers: (state)=>{
            state.value = [] as string[];
        }
    }
})

export const {addPlayers, clearPlayers} =  playersSlice.actions;

export default playersSlice.reducer;