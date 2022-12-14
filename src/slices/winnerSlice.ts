import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import playersReducer from "../reducers/playersReducer";
import { SERVER } from "../utils/config";
import { FetchFacad, Err } from "../utils/helper";

interface PlayerResult{
    name:string;
    score:number;
    isPerfectGame:boolean;
}

const initialState = {
    value: [] as PlayerResult[]
};

export const fetchResults = createAsyncThunk("playerReults/fetchResults", async function(players){
    console.log("from fetch results");

    // why try doesn't work here !!!!!
    const fetchFacad = FetchFacad.getFetchFacad();
    const data = await fetchFacad.postData(SERVER, players);
    return (data as Err).message ? [] : data;
});


export const resultsSlice = createSlice({
    name: "playerResult",
    initialState,
    reducers:{},
    extraReducers: {
        [fetchResults.fulfilled as any] : (state, action)=>{
            state.value = action.payload;
           
        }
    }
});

// export const {getPlayersResults} =  resultsSlice.actions;

export default resultsSlice.reducer;