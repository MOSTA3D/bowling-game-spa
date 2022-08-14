import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './slices/playersSlice';
import resultsReducer from './slices/winnerSlice';
import combinedReducers from "./reducers";

const store = configureStore({
    reducer: {
      players: playersReducer,
      playerResults: resultsReducer
    }
});

export default store;