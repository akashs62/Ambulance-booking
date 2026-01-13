import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Baby, Activity, AlertTriangle, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Triage.css';

const Triage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            id: 'age',
            title: "Patient's Age?",
            options: [
                { label: 'Child (0-12)', icon: <Baby size={32} />, value: 'child' },
                { label: 'Adult (13-60)', icon: <User size={32} />, value: 'adult' },
                { label: 'Senior (60+)', icon: <User size={32} />, value: 'senior' }, // Utilizing User icon repeatedly for simplicity but ideally different icons
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

    const handleAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Done
            navigate('/recommendation', { state: { answers: { ...answers, [key]: value } } });
        }
    };

    const currentQ = questions[step];

    return (
        <div className="triage-container">
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

            <AnimatePresence mode='wait'>
                <motion.div
                    key={step}
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
            </AnimatePresence>

            <div className="voice-hint">
                <span>Audio guidance enabled</span>
            </div>
        </div>
    );
};

export default Triage;
