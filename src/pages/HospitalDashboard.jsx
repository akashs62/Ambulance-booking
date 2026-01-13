import React, { useState } from 'react';
import { Siren, Clock, Activity, CheckCircle, AlertTriangle, User } from 'lucide-react';
import './HospitalDashboard.css';

const HospitalDashboard = () => {
    const [acknowledged, setAcknowledged] = useState(false);
    const [doctorAssigned, setDoctorAssigned] = useState(false);
    const [bedPrepared, setBedPrepared] = useState(false);

    return (
        <div className="hospital-dash">
            <header className="dash-header">
                <div className="header-left">
                    <Activity size={28} className="pulse-red" />
                    <h1>ER PRE-ALERT DASHBOARD</h1>
                </div>
                <div className="status-indicator">
                    <span className="live-dot"></span> LIVE
                </div>
            </header>

            <main className="dash-grid">
                {/* Incoming Alert Card */}
                <section className="incoming-card">
                    <div className="priority-stripe red-stripe">
                        <Siren size={24} className="spin-icon" />
                        <span>INCOMING - CRITICAL PRIORITY</span>
                    </div>

                    <div className="eta-big-box">
                        <div className="eta-val">08 <span className="mins">MIN</span></div>
                        <div className="eta-label">ESTIMATED ARRIVAL</div>
                    </div>

                    <div className="case-details">
                        <div className="detail-row">
                            <span className="label">CASE TYPE</span>
                            <span className="value critical">Breathing Difficulty (Asthma)</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">PATIENT</span>
                            <span className="value">Male, 34 Y/O</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">PROFILE</span>
                            <span className="value warning">Allergy: Penicillin</span>
                        </div>
                    </div>

                    <div className="action-toggles">
                        <button
                            className={`toggle-btn ${acknowledged ? 'active' : ''}`}
                            onClick={() => setAcknowledged(!acknowledged)}
                        >
                            <div className="icon-box"><CheckCircle size={24} /></div>
                            <div className="text-box">
                                <span className="btn-label">ER ALERT</span>
                                <span className="btn-status">{acknowledged ? 'ACKNOWLEDGED' : 'PENDING'}</span>
                            </div>
                        </button>

                        <button
                            className={`toggle-btn ${doctorAssigned ? 'active' : ''}`}
                            onClick={() => setDoctorAssigned(!doctorAssigned)}
                        >
                            <div className="icon-box"><User size={24} /></div>
                            <div className="text-box">
                                <span className="btn-label">DOCTOR</span>
                                <span className="btn-status">{doctorAssigned ? 'ASSIGNED' : 'REQUIRED'}</span>
                            </div>
                        </button>

                        <button
                            className={`toggle-btn ${bedPrepared ? 'active' : ''}`}
                            onClick={() => setBedPrepared(!bedPrepared)}
                        >
                            <div className="icon-box"><Activity size={24} /></div>
                            <div className="text-box">
                                <span className="btn-label">ICU BED</span>
                                <span className="btn-status">{bedPrepared ? 'PREPARED' : 'PREPARING'}</span>
                            </div>
                        </button>
                    </div>
                </section>

                {/* Tracking Map Simulation */}
                <section className="map-panel">
                    <div className="map-sim">
                        <div className="path-line"></div>
                        <div className="hospital-node">
                            <div className="node-icon">H</div>
                        </div>
                        <div className="ambulance-node">
                            <Siren size={20} color="white" />
                        </div>
                    </div>
                    <div className="map-overlay">
                        <h3>Sector 62 {'>'} City Hospital</h3>
                        <p>Traffic: Moderate</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HospitalDashboard;
