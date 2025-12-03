import React from 'react';
import { Question, QuestionnaireAnswers } from '../typing/types';
import './Questionnaire.css';

interface QuestionnaireProps {
  currentStep: number;
  questions: Question[];
  answers: QuestionnaireAnswers;
  onAnswerChange: (questionId: string, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onBack: () => void;
}

const IntroScreen: React.FC<{ onStart: () => void; onViewResults: () => void; onBack: () => void }> = ({
  onStart,
  onViewResults,
  onBack,
}) => {
  return (
    <div className="questionnaire-page">
      <button className="back-home-button" onClick={onBack}>
        Back to Home
      </button>

      <div className="questionnaire-container intro-container">
        <div className="intro-content">
          <h1 className="intro-title">Business Certification Eligibility Questionnaire</h1>
          <p className="intro-description">
            This questionnaire will help determine which business certifications you may qualify for.
            Answer a series of questions about your business to discover federal, state, local, and
            private sector certification opportunities.
          </p>

          <div className="intro-details">
            <div className="detail-item">
              <span className="detail-icon">📋</span>
              <div>
                <strong>14 Questions</strong>
                <p>About your business ownership, size, and demographics</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">⏱️</span>
              <div>
                <strong>5 Minutes</strong>
                <p>Quick and easy to complete</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🎯</span>
              <div>
                <strong>Personalized Results</strong>
                <p>Get a customized list of certifications you qualify for</p>
              </div>
            </div>
          </div>

          <div className="intro-buttons">
            <button className="nav-button primary large" onClick={onStart}>
              Start Questionnaire
            </button>
            <button className="nav-button secondary large" onClick={onViewResults}>
              See Past Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Questionnaire: React.FC<QuestionnaireProps> = ({
  currentStep,
  questions,
  answers,
  onAnswerChange,
  onNext,
  onPrev,
  onBack,
}) => {
  const [showIntro, setShowIntro] = React.useState(true);

  const handleStart = () => {
    setShowIntro(false);
  };

  const handleViewResults = () => {
    // Placeholder for future functionality
    alert('Past results functionality coming soon!');
  };

  if (showIntro) {
    return <IntroScreen onStart={handleStart} onViewResults={handleViewResults} onBack={onBack} />;
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="questionnaire-page">
      <button className="back-home-button" onClick={onBack}>
        Back to Home
      </button>

      <div className="questionnaire-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">
          Question {currentStep + 1} of {questions.length}
        </p>

        <div className="question-card">
          <h2>{currentQuestion.question}</h2>
          <div className="options-container">
            {currentQuestion.options.map((option) => (
              <label key={option} className="option-label">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={(e) => onAnswerChange(currentQuestion.id, e.target.value)}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-button secondary"
            onClick={onPrev}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            className="nav-button primary"
            onClick={onNext}
            disabled={!answers[currentQuestion.id]}
          >
            {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
