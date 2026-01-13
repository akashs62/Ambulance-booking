import React, { useState, useEffect } from 'react';
import { Phone, Share2, MapPin, Navigation, User, CheckCircle, Activity, Bed } from 'lucide-react';
import './Tracking.css';

const Tracking = () => {
    const [status, setStatus] = useState('Dispatched');

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
            <div className="map-view">
                {/* Placeholder for Map */}
                <div className="map-placeholder">
                    <div className="map-bg-pattern"></div>
                    <div className="ambulance-marker">
                        <Navigation size={32} fill="white" />
                    </div>
                    <div className="patient-marker">
                        <MapPin size={32} fill="#dc2626" color="#dc2626" />
                    </div>

                    {/* Hospital Readiness Panel Overlay */}
                    <div className="hospital-readiness-panel">
                        <div className="panel-header">Hospital Readiness</div>
                        <div className="readiness-item active">
                            <CheckCircle size={16} className="check-icon" />
                            <span>ER Alert Received</span>
                        </div>
                        <div className="readiness-item active">
                            <CheckCircle size={16} className="check-icon" />
                            <span>Doctor Assigned</span>
                        </div>
                        <div className="readiness-item pending">
                            <Bed size={16} className="pending-icon" />
                            <span>Bed Preparation...</span>
                        </div>
                        <div className="panel-footer">Doctors are preparing before arrival</div>
                    </div>

                </div>

                <div className="eta-badge">
                    <span className="eta-time">08</span>
                    <span className="eta-unit">MIN</span>
                </div>
            </div>

            <div className="tracking-sheet">
                <div className="status-bar">
                    <div className={`status-step ${status === 'Dispatched' ? 'active' : 'completed'}`}></div>
                    <div className={`status-step ${status === 'En Route' ? 'active' : (['Arriving', 'Reached'].includes(status) ? 'completed' : '')}`}></div>
                    <div className={`status-step ${status === 'Arriving' ? 'active' : (status === 'Reached' ? 'completed' : '')}`}></div>
                </div>
                <h2 className="status-text">{status.toUpperCase()}</h2>

                <div className="driver-info">
                    <div className="driver-avatar">
                        <User size={32} />
                    </div>
                    <div className="driver-details">
                        <h3>Ramesh Kumar</h3>
                        <p>UP-16-AM-2024 • ALS Ambulance</p>
                    </div>
                    <button className="call-btn">
                        <Phone size={24} />
                    </button>
                </div>

                <div className="action-row">
                    <button className="share-btn">
                        <Share2 size={20} />
                        <span>Share Live Link</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tracking;
