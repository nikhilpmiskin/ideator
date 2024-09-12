import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import YtTable from './components/YtTable';
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
