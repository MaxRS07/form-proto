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

const Questionnaire: React.FC<QuestionnaireProps> = ({
  currentStep,
  questions,
  answers,
  onAnswerChange,
  onNext,
  onPrev,
  onBack,
}) => {
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="questionnaire-page">
      <button className="back-home-button" onClick={onBack}>
        ← Back to Home
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
