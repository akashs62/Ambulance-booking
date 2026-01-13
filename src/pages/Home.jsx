import React, { useState, useEffect } from 'react';
import { Mic, MapPin, Globe, ShieldAlert, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Detecting location...');
  const [isLocating, setIsLocating] = useState(true);

  useEffect(() => {
    // Simulate location detection
    const timer = setTimeout(() => {
      setLocation('Sector 62, Noida, UP');
      setIsLocating(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <button className="profile-btn-home" onClick={() => navigate('/profile')}>
          <User size={24} />
        </button>
        <div className="location-badge">
          <MapPin size={20} className={isLocating ? "pulse-icon" : ""} />
          <span className="location-text">{location}</span>
        </div>
        <button className="lang-btn" aria-label="Change Language">
          <Globe size={24} />
          <span>EN</span>
        </button>
      </header>

      <main className="main-action-area">
        <div className="emergency-wrapper">
          <motion.button
            className="emergency-btn"
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ["0 0 0 0px rgba(220, 38, 38, 0.7)", "0 0 0 20px rgba(220, 38, 38, 0)"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => navigate('/triage')}
          >
            <ShieldAlert size={64} className="emergency-icon" />
            <span className="emergency-label">EMERGENCY</span>
            <span className="emergency-sub">TAP TO BOOK AMBULANCE</span>
          </motion.button>
          <p className="pre-alert-text">We alert the hospital before you arrive</p>
        </div>

        <button className="voice-btn">
          <Mic size={32} />
          <span>Speak to Book</span>
        </button>
      </main>

      <footer className="home-footer">
        <button className="secondary-action">Book for someone else</button>
      </footer>
    </div>
  );
};

export default Home;
