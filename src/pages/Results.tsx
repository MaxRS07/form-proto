import React from 'react';
import { Certification } from '../typing/types';
import './Results.css';

interface ResultsProps {
  results: Certification[];
  onStartOver: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, onStartOver }) => {
  return (
    <div className="results-page">
      <div className="results-container">
        <h1>Your Certification Eligibility Results</h1>

        {results.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">⚠️</div>
            <h2>No Matching Certifications Found</h2>
            <p>
              Based on your responses, you may not currently meet the basic eligibility requirements
              for the certifications in our database. Common requirements include:
            </p>
            <ul>
              <li>U.S. citizenship or legal residency</li>
              <li>For-profit business structure</li>
              <li>Meeting specific ownership and control criteria</li>
              <li>Business operational for minimum time period</li>
            </ul>
            <div className="help-box">
              <h3>Need Help?</h3>
              <p>
                Consider reviewing your business structure or reach out to the SBA for guidance:
              </p>
              <p className="contact-info">
                <strong>📞 866-443-4110</strong>
                <br />
                <strong>✉️ certifications@sba.gov</strong>
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="results-intro">
              🎉 Great news! Based on your responses, you appear eligible for <strong>{results.length}</strong>{' '}
              certification{results.length !== 1 ? 's' : ''}:
            </p>

            {results.length > 1 && (
              <div className="apply-all-section">
                <button
                  className="apply-all-button"
                  onClick={() => {
                    window.location.assign("/apply");
                  }}
                >
                  💼 Apply to All {results.length} Certifications
                </button>
                <p className="apply-all-hint">Apply for all certifications in one form</p>
              </div>
            )}

            <div className="certifications-grid">
              {results.map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="cert-header">
                    <span className="cert-type">{cert.type}</span>
                    <h3>{cert.name}</h3>
                  </div>
                  <p className="cert-description">{cert.description}</p>
                  <div className="cert-benefits">
                    <h4>Key Benefits:</h4>
                    <ul>
                      {cert.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={cert.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apply-button"
                  >
                    Apply Now →
                  </a>
                </div>
              ))}
            </div>

            <div className="next-steps">
              <h3>📋 Recommended Next Steps:</h3>
              <ol>
                <li>
                  <strong>Start with free federal certifications</strong> (WOSB or 8(a)) -
                  no cost and biggest contract access
                </li>
                <li>
                  <strong>Register in System for Award Management (SAM)</strong> at{' '}
                  <a href="https://sam.gov" target="_blank" rel="noopener noreferrer">sam.gov</a>
                </li>
                <li>
                  <strong>Gather required documents</strong> - tax returns, business formation
                  documents, financial statements, proof of citizenship
                </li>
                <li>
                  <strong>Apply to all free state/local programs</strong> for maximum opportunities
                </li>
                <li>
                  <strong>Consider private sector certifications</strong> (WBENC/NMSDC) for
                  corporate supply chain access
                </li>
                <li>
                  <strong>Track renewal dates</strong> - Start renewal process 60-90 days early
                </li>
                <li>
                  <strong>Use certification logos</strong> on your website, proposals, and
                  marketing materials
                </li>
              </ol>
            </div>

            <div className="strategic-tips">
              <h3>💡 Strategic Certification Tips:</h3>
              <div className="tips-grid">
                <div className="tip-card">
                  <div className="tip-icon">🎯</div>
                  <h4>Leverage Reciprocity</h4>
                  <p>Use WBENC or NMSDC certification to fast-track CPUC Clearinghouse approval</p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">📊</div>
                  <h4>Register in All Databases</h4>
                  <p>Ensure buyers can find you in SAM.gov, WBENCLink, and other certification databases</p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">🤝</div>
                  <h4>Attend Certification Events</h4>
                  <p>Networking at certification events often leads directly to contract opportunities</p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">🏆</div>
                  <h4>Maintain All Certifications</h4>
                  <p>Each certification opens different doors and buyer pools - maintain them all</p>
                </div>
              </div>
            </div>
          </>
        )}

        <button className="start-over-button" onClick={onStartOver}>
          Start Over
        </button>
      </div>
    </div>
  );
};

export default Results;
