import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Triage from './pages/Triage';
import Recommendation from './pages/Recommendation';
import Tracking from './pages/Tracking';
import Profile from './pages/Profile';
import Paramedic from './pages/Paramedic';
import HospitalDashboard from './pages/HospitalDashboard';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/paramedic" element={<Paramedic />} />
          <Route path="/hospital" element={<HospitalDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
