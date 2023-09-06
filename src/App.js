import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Stake from './pages/stake';
import Burn from './pages/burn';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/burn" element={<Burn />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
