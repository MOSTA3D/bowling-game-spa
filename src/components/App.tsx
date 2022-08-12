import React from 'react';
import '../App.scss';
import RegisterPlayers from './RegisterPlayers';
import { Routes, Route, Navigate } from 'react-router';
import NotFound from "./NotFound";
import Game from './Game';
import Results from './Results';
import { FetchFacad } from '../utils/helper';
import { SERVER } from '../utils/config';


// (async function(){
//   const x = FetchFacad.getFetchFacad();
//   console.log(await x.postData(SERVER, {"s":[1,2,3,1,1,1,1,1,1,1,2,2,3,4,5,6,7,3,4,4,0,0,0,0]}));
// })();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPlayers />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
