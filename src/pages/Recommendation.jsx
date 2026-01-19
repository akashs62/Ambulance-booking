import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ambulance, Clock, Building2, Activity, ArrowLeft } from 'lucide-react';
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
            {/* Back Button */}
            <motion.button
                className="back-btn-rec"
                onClick={() => navigate('/triage')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ArrowLeft size={24} />
                <span>Back</span>
            </motion.button>

            <motion.h1
                className="rec-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Hospital Auto-Match Found
            </motion.h1>

            <motion.div
                className={`rec-card ${isCritical ? 'critical-border' : 'safe-border'}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.div
                    className="rec-badge-pulse"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Activity size={16} /> ER PRE-ALERT SENT
                </motion.div>

                <div className="match-grid">
                    <motion.div
                        className="match-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Ambulance size={40} className="rec-icon" />
                        <div>
                            <span className="match-label">Ambulance</span>
                            <h3 className="match-val">{recommendedType.split('(')[0]}</h3>
                        </div>
                    </motion.div>
                    <motion.div
                        className="match-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Building2 size={40} className="rec-icon" />
                        <div>
                            <span className="match-label">Destination</span>
                            <h3 className="match-val">City Hospital (Trauma)</h3>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="prepared-msg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p>This hospital is prepared for your emergency.</p>
                </motion.div>

                <motion.div
                    className="est-arrival"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <Clock size={20} />
                    <span>Ambulance arriving in 8-12 mins</span>
                </motion.div>
            </motion.div>

            <motion.div
                className="auto-proceed-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <p>Confirming match in {timeLeft}s...</p>
                <motion.button
                    className="confirm-btn"
                    onClick={() => navigate('/tracking')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Confirm & Track
                </motion.button>
            </motion.div>

            <motion.button
                className="change-btn"
                onClick={() => navigate('/triage')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Wrong Info? Change
            </motion.button>
        </div>
    );
};

export default Recommendation;
