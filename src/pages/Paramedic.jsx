import React, { useState } from 'react';
import { Navigation, Phone, Shield, Mic } from 'lucide-react';
import './Paramedic.css';

const Paramedic = () => {
    const [accepted, setAccepted] = useState(false);

    if (!accepted) {
        return (
            <div className="paramedic-container dark-mode">
                <h1 className="incoming-alert">NEW EMERGENCY</h1>
                <div className="alert-card">
                    <h2>Breathing Difficulty</h2>
                    <div className="location-box">
                        <span>Sector 62, Noida</span>
                        <span className="dist">2.4 km away</span>
                    </div>
                    <div className="patient-snippet">
                        <span>Male, 34</span>
                        <span className="badge-critical">ALS REQ</span>
                    </div>
                </div>
                <button
                    className="accept-btn"
                    onClick={() => setAccepted(true)}
                >
                    ACCEPT (Tap)
                </button>
            </div>
        );
    }

    return (
        <div className="paramedic-container nav-mode">
            <div className="nav-header">
                <div className="turn-indicator">
                    <Navigation size={48} className="nav-icon" />
                    <div className="turn-text">
                        <h2>Turn Right</h2>
                        <p>in 200m at Main St</p>
                    </div>
                </div>
                <div className="time-box">
                    <span className="big-time">4m</span>
                    <span>ETA</span>
                </div>
            </div>

            <div className="patient-cards-scroll">
                <div className="info-card critical">
                    <div className="card-label">CRITICAL INFO</div>
                    <div className="card-value">Asthma History</div>
                </div>
                <div className="info-card">
                    <div className="card-label">BLOOD GROUP</div>
                    <div className="card-value">O+ Positive</div>
                </div>
                <div className="info-card warning">
                    <div className="card-label">ALLERGIES</div>
                    <div className="card-value">Penicillin</div>
                </div>
            </div>

            <div className="paramedic-controls">
                <button className="control-btn"><Phone size={32} /></button>
                <button className="control-btn main"><Mic size={32} /></button>
                <button className="control-btn"><Shield size={32} /></button>
            </div>
        </div>
    );
};

export default Paramedic;
