import React from 'react';

interface NotFoundProps {
    onHome: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onHome }) => {
    return (
        <div className="questionnaire-page">
            <div className="questionnaire-container">
                <div className="question-card">
                    <h2>404 — Page not found</h2>
                    <p style={{ color: '#444', marginTop: '12px' }}>
                        We couldn't find the page you're looking for.
                    </p>
                    <div style={{ marginTop: 18 }}>
                        <button className="cta-button" onClick={onHome}>
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
