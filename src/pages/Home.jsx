import React, { useState, useEffect } from 'react';
import { Mic, MapPin, Globe, ShieldAlert, User, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Detecting location...');
  const [isLocating, setIsLocating] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [showBookForOthers, setShowBookForOthers] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    phone: '',
    age: ''
  });

  useEffect(() => {
    // Simulate location detection
    const timer = setTimeout(() => {
      setLocation('Sector 62, Noida, UP');
      setIsLocating(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleVoiceBooking = () => {
    // Check if browser supports Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceText('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setVoiceText(`You said: "${transcript}"`);

      // Check for booking keywords
      if (transcript.includes('book') || transcript.includes('ambulance') ||
        transcript.includes('emergency') || transcript.includes('help')) {
        setTimeout(() => {
          navigate('/triage');
        }, 1000);
      } else {
        setTimeout(() => {
          setVoiceText('');
          setIsListening(false);
        }, 2000);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setVoiceText('Could not understand. Please try again.');
      setTimeout(() => {
        setVoiceText('');
        setIsListening(false);
      }, 2000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleBookForOthers = () => {
    setShowBookForOthers(true);
  };

  const handlePatientDetailsSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!patientDetails.name || !patientDetails.phone || !patientDetails.age) {
      alert('Please fill in all fields');
      return;
    }

    if (patientDetails.phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    if (patientDetails.age < 1 || patientDetails.age > 120) {
      alert('Please enter a valid age');
      return;
    }

    // Store patient details and navigate to triage
    sessionStorage.setItem('patientDetails', JSON.stringify(patientDetails));
    navigate('/triage');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

        <motion.button
          className={`voice-btn ${isListening ? 'listening' : ''}`}
          onClick={handleVoiceBooking}
          whileTap={{ scale: 0.95 }}
          animate={isListening ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 1,
            repeat: isListening ? Infinity : 0
          }}
        >
          <Mic size={32} />
          <span>{isListening ? 'Listening...' : 'Speak to Book'}</span>
        </motion.button>

        {voiceText && (
          <motion.div
            className="voice-feedback"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {voiceText}
          </motion.div>
        )}
      </main>

      <footer className="home-footer">
        <button className="secondary-action" onClick={handleBookForOthers}>
          Book for someone else
        </button>
      </footer>

      {/* Patient Details Modal */}
      <AnimatePresence>
        {showBookForOthers && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookForOthers(false)}
            />
            <motion.div
              className="patient-details-modal"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="modal-header">
                <h2>Patient Details</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowBookForOthers(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="warning-box">
                <AlertTriangle size={20} className="warning-icon" />
                <p className="warning-text">
                  <strong>Warning:</strong> Ambulances are meant for emergencies only.
                  Please book responsibly. Accidental, incorrect, or misuse of bookings
                  may result in heavy cancellation or service charges as per provider policy.
                </p>
              </div>

              <form className="patient-form" onSubmit={handlePatientDetailsSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Patient Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={patientDetails.name}
                    onChange={handleInputChange}
                    placeholder="Enter patient's full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={patientDetails.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit phone number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age *</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={patientDetails.age}
                    onChange={handleInputChange}
                    placeholder="Enter patient's age"
                    min="1"
                    max="120"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="submit-patient-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Booking
                </motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
