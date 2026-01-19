import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Triage = lazy(() => import('./pages/Triage'));
const Recommendation = lazy(() => import('./pages/Recommendation'));
const Tracking = lazy(() => import('./pages/Tracking'));
const Profile = lazy(() => import('./pages/Profile'));
const Paramedic = lazy(() => import('./pages/Paramedic'));
const HospitalDashboard = lazy(() => import('./pages/HospitalDashboard'));

// Loading fallback component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'var(--color-bg-app)'
  }}>
    <div style={{
      textAlign: 'center',
      color: 'var(--color-text-sub)'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px'
      }} />
      <p>Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/triage" element={<Triage />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/paramedic" element={<Paramedic />} />
            <Route path="/hospital" element={<HospitalDashboard />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
