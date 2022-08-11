import React from 'react';
import '../App.scss';
import RegisterPlayers from './RegisterPlayers';
import { Routes, Route, Navigate } from 'react-router';
import NotFound from "./NotFound";
import Game from './Game';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPlayers />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
