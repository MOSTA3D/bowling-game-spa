// import React from 'react';
// import { queryByAttribute, render, screen } from '@testing-library/react';
// import App from '../components/App';
import { store } from '../store';

import playerReducer, {addPlayers, clearPlayers} from "../slices/playersSlice";
import { mapPlayers, Player } from '../utils/helper';
import playersReducer from '../slices/playersSlice';
import resultReducer, { fetchResults } from "../slices/winnerSlice";

const players = ["sheka", "bebo", "atrigan"].map(el=>new Player(el));

// for(let i = 0; i < players.length; i++){

// }

describe("unit-testing redux dispatch and state", ()=>{
  // render(<App />)
  it("expects players to be empty at start ", ()=>{
    expect((store.getState() as any).players?.value.length).toEqual(0);
  })
  
  it("expects elements existed after adding them to the players array", ()=>{
    store.dispatch(addPlayers(players));
    expect(((store.getState() as any).players?.value.length)).toBeGreaterThan(0);
  });

  it("expects empty players to have an empty array after dispatching with clearPlayers action", ()=>{
    store.dispatch(clearPlayers());
    expect(((store.getState() as any).players?.value.length)).toBe(0);
  })
});


describe("testing playerReducer reducers", ()=>{
  it("expects adding the players with the addPlayers action", ()=>{
    const newState = playersReducer((store.getState as any).players, addPlayers(players));
    expect(newState.value.length).toEqual(3);
  });

  it("expects to clear the players with clearPlayers action", ()=>{
    const newState = playerReducer((store.getState as any).players, clearPlayers());
    expect(newState.value).toEqual([]);
  });
});



// this fails : i don't gurantee the stability of the internet so i will push now and thinking about it after.
describe("testing resultsReducer", ()=>{
  it("expects getting player results with fetchResults action", ()=>{
    const mappedPlayers = mapPlayers(players);
    // console.log(mappedPlayers);
    const newState = resultReducer((store.getState as any).playerResults, (fetchResults as any)(mappedPlayers));
    console.log("the thing is " , newState);
    expect(newState.value.length).toEqual(players.length);
  })
});