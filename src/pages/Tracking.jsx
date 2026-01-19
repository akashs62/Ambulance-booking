import React, { useState, useEffect } from 'react';
import { Phone, Share2, MapPin, Navigation, User, CheckCircle, Activity, Bed, ArrowLeft, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TrackingMap from '../components/TrackingMap';
import './Tracking.css';

const Tracking = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('Dispatched');
    const [showDriverInfo, setShowDriverInfo] = useState(false);

    // Simulate status progression
    useEffect(() => {
        const statuses = ['Dispatched', 'En Route', 'Arriving', 'Reached'];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % statuses.length;
            setStatus(statuses[i]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="tracking-container">
            {/* Back Button */}
            <motion.button
                className="back-btn"
                onClick={() => navigate('/')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ArrowLeft size={24} />
                <span>New Booking</span>
            </motion.button>

            <div className="map-view">
                {/* Mapbox Map */}
                <TrackingMap />

                {/* Hospital Readiness Panel Overlay */}
                <motion.div
                    className="hospital-readiness-panel"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="panel-header">Hospital Readiness</div>
                    <motion.div
                        className="readiness-item active"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <CheckCircle size={16} className="check-icon" />
                        <span>ER Alert Received</span>
                    </motion.div>
                    <motion.div
                        className="readiness-item active"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <CheckCircle size={16} className="check-icon" />
                        <span>Doctor Assigned</span>
                    </motion.div>
                    <motion.div
                        className="readiness-item pending"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Bed size={16} className="pending-icon" />
                        <span>Bed Preparation...</span>
                    </motion.div>
                    <div className="panel-footer">Doctors are preparing before arrival</div>
                </motion.div>

                <motion.div
                    className="eta-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="eta-time">08</span>
                    <span className="eta-unit">MIN</span>
                </motion.div>
            </div>

            <motion.div
                className="tracking-sheet"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="status-bar">
                    <motion.div
                        className={`status-step ${status === 'Dispatched' ? 'active' : 'completed'}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5 }}
                    ></motion.div>
                    <motion.div
                        className={`status-step ${status === 'En Route' ? 'active' : (['Arriving', 'Reached'].includes(status) ? 'completed' : '')}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6 }}
                    ></motion.div>
                    <motion.div
                        className={`status-step ${status === 'Arriving' ? 'active' : (status === 'Reached' ? 'completed' : '')}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7 }}
                    ></motion.div>
                </div>
                <motion.h2
                    className="status-text"
                    key={status}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {status.toUpperCase()}
                </motion.h2>

                <div className="driver-info">
                    <div className="driver-avatar">
                        <User size={32} />
                    </div>
                    <div className="driver-details">
                        <h3>Ramesh Kumar</h3>
                        <p>UP-16-AM-2024 • ALS Ambulance</p>
                    </div>
                    <motion.button
                        className="info-btn"
                        onClick={() => setShowDriverInfo(true)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Info size={24} />
                    </motion.button>
                    <motion.button
                        className="call-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Phone size={24} />
                    </motion.button>
                </div>

                <div className="action-row">
                    <motion.button
                        className="share-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Share2 size={20} />
                        <span>Share Live Link</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Driver Info Modal */}
            <AnimatePresence>
                {showDriverInfo && (
                    <>
                        <motion.div
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDriverInfo(false)}
                        />
                        <motion.div
                            className="driver-info-modal"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="modal-header">
                                <h2>Driver Details</h2>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowDriverInfo(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="modal-content">
                                <div className="driver-avatar-large">
                                    <User size={64} />
                                </div>
                                <div className="driver-info-details">
                                    <div className="info-row">
                                        <span className="info-label">Name</span>
                                        <span className="info-value">Ramesh Kumar</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Vehicle Number</span>
                                        <span className="info-value">UP-16-AM-2024</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Ambulance Type</span>
                                        <span className="info-value">ALS (Advanced Life Support)</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Experience</span>
                                        <span className="info-value">8 Years</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Rating</span>
                                        <span className="info-value">⭐ 4.9 / 5.0</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">License Number</span>
                                        <span className="info-value">DL-UP-2016-0123456</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Contact</span>
                                        <span className="info-value">+91 98765 43210</span>
                                    </div>
                                </div>
                                <motion.button
                                    className="modal-call-btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Phone size={20} />
                                    <span>Call Driver</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Tracking;
