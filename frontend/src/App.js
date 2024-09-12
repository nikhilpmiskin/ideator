import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import YtTable from './components/YtTable';
import axios from 'axios';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Chat />} /> */}
          <Route path="/topyoutubers" element={<YtTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
