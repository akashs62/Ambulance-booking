import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Ambulance, Clock, Building2, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import './Recommendation.css';

const Recommendation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(5);

    // Mock logic based on answers if available, otherwise default
    const { answers, manualSelection } = location.state || {};

    // Determine type: Manual selection takes precedence, otherwise calculate
    let recommendedType;
    if (manualSelection) {
        recommendedType = manualSelection;
    } else {
        const criticalCalc = answers?.breathing === 'yes' || answers?.conscious === 'no';
        recommendedType = criticalCalc ? 'ALS (Advanced Life Support)' : 'BLS (Basic Life Support)';
    }

    const isCritical = recommendedType.includes('ALS');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/tracking');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="rec-container">
            <h1 className="rec-title">Hospital Auto-Match Found</h1>

            <motion.div
                className={`rec-card ${isCritical ? 'critical-border' : 'safe-border'}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="rec-badge-pulse">
                    <Activity size={16} /> ER PRE-ALERT SENT
                </div>

                <div className="match-grid">
                    <div className="match-item">
                        <Ambulance size={40} className="rec-icon" />
                        <div>
                            <span className="match-label">Ambulance</span>
                            <h3 className="match-val">{recommendedType.split('(')[0]}</h3>
                        </div>
                    </div>
                    <div className="match-item">
                        <Building2 size={40} className="rec-icon" />
                        <div>
                            <span className="match-label">Destination</span>
                            <h3 className="match-val">City Hospital (Trauma)</h3>
                        </div>
                    </div>
                </div>

                <div className="prepared-msg">
                    <p>This hospital is prepared for your emergency.</p>
                </div>

                <div className="est-arrival">
                    <Clock size={20} />
                    <span>Ambulance arriving in 8-12 mins</span>
                </div>
            </motion.div>

            <div className="auto-proceed-section">
                <p>Confirming match in {timeLeft}s...</p>
                <button
                    className="confirm-btn"
                    onClick={() => navigate('/tracking')}
                >
                    Confirm & Track
                </button>
            </div>

            <button className="change-btn" onClick={() => navigate('/triage')}>
                Wrong Info? Change
            </button>
        </div>
    );
};

export default Recommendation;
