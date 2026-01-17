import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Baby, Activity, AlertTriangle, Check, X, Ambulance, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Triage.css';

const Triage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [directMode, setDirectMode] = useState(false);

    const questions = [
        {
            id: 'age',
            title: "Patient's Age?",
            options: [
                { label: 'Child (0-12)', icon: <Baby size={32} />, value: 'child' },
                { label: 'Adult (13-60)', icon: <User size={32} />, value: 'adult' },
                { label: 'Senior (60+)', icon: <User size={32} />, value: 'senior' },
            ]
        },
        {
            id: 'conscious',
            title: "Is patient conscious?",
            layout: 'yes-no',
            options: [
                { label: 'Yes', icon: <Check size={40} />, value: 'yes', color: 'safe' },
                { label: 'No', icon: <X size={40} />, value: 'no', color: 'critical' },
            ]
        },
        {
            id: 'breathing',
            title: "Difficulty breathing?",
            layout: 'yes-no',
            options: [
                { label: 'Yes', icon: <AlertTriangle size={40} />, value: 'yes', color: 'critical' },
                { label: 'No', icon: <Activity size={40} />, value: 'no', color: 'safe' },
            ]
        }
    ];

    const directOptions = [
        {
            label: 'BLS (Basic Support)',
            sub: 'For stable patients',
            icon: <Ambulance size={32} />,
            value: 'BLS (Basic Life Support)',
            color: 'safe'
        },
        {
            label: 'ALS (Advanced Support)',
            sub: 'For critical care',
            icon: <HeartPulse size={32} />,
            value: 'ALS (Advanced Life Support)',
            color: 'critical'
        }
    ];

    const handleAnswer = (key, value) => {
        const newAnswers = { ...answers, [key]: value };
        setAnswers(newAnswers);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            navigate('/recommendation', { state: { answers: { ...newAnswers, [key]: value } } });
        }
    };

    const handleDirectSelect = (value) => {
        navigate('/recommendation', { state: { manualSelection: value } });
    };

    const currentQ = questions[step];

    return (
        <div className="triage-container">
            {!directMode && (
                <>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>

                    <div className="triage-header">
                        <h2 className="triage-step">Question {step + 1} of {questions.length}</h2>
                        <p className="reassurance-text">Used only to prioritize emergency response.</p>
                    </div>
                </>
            )}

            {directMode && (
                <div className="direct-header">
                    <h2 className="direct-title">Select Ambulance Type</h2>
                    <p className="direct-sub">Choose based on patient condition</p>
                </div>
            )}

            <AnimatePresence mode='wait'>
                {!directMode ? (
                    <motion.div
                        key={`q-${step}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="question-card"
                    >
                        <h1 className="question-title">{currentQ.title}</h1>

                        <div className={`options-grid ${currentQ.layout === 'yes-no' ? 'yes-no-grid' : ''}`}>
                            {currentQ.options.map((opt) => (
                                <button
                                    key={opt.label}
                                    className={`option-btn ${opt.color ? opt.color : ''}`}
                                    onClick={() => handleAnswer(currentQ.id, opt.value)}
                                >
                                    <div className="opt-icon">{opt.icon}</div>
                                    <span className="opt-label">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="direct"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="question-card"
                    >
                        <div className="options-grid">
                            {directOptions.map((opt) => (
                                <button
                                    key={opt.label}
                                    className={`option-btn ${opt.color}`}
                                    onClick={() => handleDirectSelect(opt.value)}
                                >
                                    <div className="opt-icon">{opt.icon}</div>
                                    <span className="opt-label">{opt.label}</span>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{opt.sub}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="skip-container">
                <button
                    className="skip-btn"
                    onClick={() => setDirectMode(!directMode)}
                >
                    {directMode ? "Help me decide (Start Triage)" : "I know what I need (Skip Questions)"}
                </button>
            </div>

            {!directMode && (
                <div className="voice-hint">
                    <span>Audio guidance enabled</span>
                </div>
            )}
        </div>
    );
};

export default Triage;
