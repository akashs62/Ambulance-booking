import React, { useState } from 'react';
import { User, Heart, AlertCircle, Phone, Lock, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [isLocked, setIsLocked] = useState(true);

    return (
        <div className="profile-container">
            <header className="profile-header">
                <button onClick={() => navigate('/')}><ArrowLeft /></button>
                <h1>Emergency ID</h1>
                <button className="lock-btn" onClick={() => setIsLocked(!isLocked)}>
                    {isLocked ? <Lock size={20} /> : <span style={{ fontSize: '0.8rem' }}>EDIT</span>}
                </button>
            </header>

            <div className="profile-content">
                <section className="profile-section">
                    <div className="section-title">
                        <User size={20} className="section-icon" />
                        Basic Info
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label>Name</label>
                            <div className="value">Rahul Sharma</div>
                        </div>
                        <div className="field">
                            <label>Blood Group</label>
                            <div className="value highlight">O+ Positive</div>
                        </div>
                        <div className="field">
                            <label>Age</label>
                            <div className="value">34 Years</div>
                        </div>
                    </div>
                </section>

                <section className="profile-section">
                    <div className="section-title">
                        <Heart size={20} className="section-icon" />
                        Medical
                    </div>
                    <div className="field-group">
                        <div className="field full">
                            <label>Allergies</label>
                            <div className="value critical-text">Penicillin, Peanuts</div>
                        </div>
                        <div className="field full">
                            <label>Chronic Conditions</label>
                            <div className="value">Asthma (Mild)</div>
                        </div>
                    </div>
                </section>

                <section className="profile-section">
                    <div className="section-title">
                        <Phone size={20} className="section-icon" />
                        Emergency Contacts
                    </div>
                    <div className="contact-card">
                        <div className="contact-info">
                            <span className="name">Priya Sharma</span>
                            <span className="relation">Wife</span>
                        </div>
                        <button className="call-mini-btn"><Phone size={16} /></button>
                    </div>
                </section>
            </div>

            <div className="consent-footer">
                <AlertCircle size={16} />
                <p>You have consented to share this data with emergency responders.</p>
            </div>
        </div>
    );
};

export default Profile;
