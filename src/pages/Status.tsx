import React, { useState } from 'react';
import './Status.css';

interface ApplicationStatus {
    id: string;
    certificationName: string;
    certType: string;
    status: 'submitted' | 'under-review' | 'approved' | 'rejected' | 'expired';
    submittedDate: string;
    lastUpdated: string;
    notes?: string;
    expiryDate?: string;
}

const Status: React.FC = () => {
    // Mock data - in a real app, this would come from a backend
    const [applications] = useState<ApplicationStatus[]>([
        {
            id: '1',
            certificationName: 'WOSB (Women-Owned Small Business)',
            certType: 'Federal',
            status: 'approved',
            submittedDate: '2025-09-15',
            lastUpdated: '2025-11-10',
            expiryDate: '2027-11-10',
            notes: 'Successfully approved and certified.',
        },
        {
            id: '2',
            certificationName: 'EDWOSB (Economically Disadvantaged Women-Owned Small Business)',
            certType: 'Federal',
            status: 'under-review',
            submittedDate: '2025-10-20',
            lastUpdated: '2025-11-18',
            notes: 'Currently under review. Expected decision within 2 weeks.',
        },
        {
            id: '3',
            certificationName: 'CPUC Supplier Clearinghouse (WBE/MBE/LGBTBE)',
            certType: 'California State',
            status: 'submitted',
            submittedDate: '2025-11-01',
            lastUpdated: '2025-11-01',
            notes: 'Application received and queued for initial review.',
        },
        {
            id: '4',
            certificationName: 'California Unified Certification Program (CUCP)',
            certType: 'California State',
            status: 'rejected',
            submittedDate: '2025-08-10',
            lastUpdated: '2025-09-05',
            notes: 'Application did not meet income requirements. You may reapply after 12 months.',
        },
        {
            id: '5',
            certificationName: 'NMSDC (National Minority Supplier Development Council)',
            certType: 'National Private Sector',
            status: 'approved',
            submittedDate: '2025-07-22',
            lastUpdated: '2025-10-15',
            expiryDate: '2027-10-15',
            notes: 'Certification active and in good standing.',
        },
    ]);

    const getStatusBadge = (status: ApplicationStatus['status']) => {
        const statusConfig = {
            approved: { label: '✓ Approved', className: 'status-approved' },
            'under-review': { label: '⏳ Under Review', className: 'status-review' },
            submitted: { label: '📤 Submitted', className: 'status-submitted' },
            rejected: { label: '✗ Rejected', className: 'status-rejected' },
            expired: { label: '⏰ Expired', className: 'status-expired' },
        };
        return statusConfig[status];
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const approvedCount = applications.filter((app) => app.status === 'approved').length;
    const pendingCount = applications.filter(
        (app) => app.status === 'under-review' || app.status === 'submitted'
    ).length;

    return (
        <div className="status-page">
            <div className="status-container">
                <div className="status-header">
                    <h1>Application Status Dashboard</h1>
                    <p className="status-subtitle">Track your certification applications</p>
                </div>

                <div className="status-summary">
                    <div className="summary-card">
                        <div className="summary-number">{applications.length}</div>
                        <div className="summary-label">Total Applications</div>
                    </div>
                    <div className="summary-card highlight">
                        <div className="summary-number">{approvedCount}</div>
                        <div className="summary-label">Approved</div>
                    </div>
                    <div className="summary-card">
                        <div className="summary-number">{pendingCount}</div>
                        <div className="summary-label">Pending</div>
                    </div>
                </div>

                <div className="applications-section">
                    <h2>Your Applications</h2>
                    <div className="applications-grid">
                        {applications.map((app) => {
                            const statusConfig = getStatusBadge(app.status);
                            return (
                                <div key={app.id} className="application-card">
                                    <div className="app-header">
                                        <div className="app-title-section">
                                            <h3>{app.certificationName}</h3>
                                            <span className="app-type">{app.certType}</span>
                                        </div>
                                        <span className={`status-badge ${statusConfig.className}`}>
                                            {statusConfig.label}
                                        </span>
                                    </div>

                                    <div className="app-details">
                                        <div className="detail-row">
                                            <span className="detail-label">Submitted:</span>
                                            <span className="detail-value">{formatDate(app.submittedDate)}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Last Updated:</span>
                                            <span className="detail-value">{formatDate(app.lastUpdated)}</span>
                                        </div>
                                        {app.expiryDate && (
                                            <div className="detail-row">
                                                <span className="detail-label">Expires:</span>
                                                <span className="detail-value">{formatDate(app.expiryDate)}</span>
                                            </div>
                                        )}
                                    </div>

                                    {app.notes && (
                                        <div className="app-notes">
                                            <p>{app.notes}</p>
                                        </div>
                                    )}

                                    {app.status === 'approved' && (
                                        <div className="app-actions">
                                            <button className="action-button primary">View Certificate</button>
                                            <button className="action-button secondary">Manage</button>
                                        </div>
                                    )}

                                    {app.status === 'under-review' && (
                                        <div className="app-actions">
                                            <button className="action-button secondary">Request Update</button>
                                        </div>
                                    )}

                                    {app.status === 'submitted' && (
                                        <div className="app-actions">
                                            <button className="action-button secondary">View Application</button>
                                        </div>
                                    )}

                                    {app.status === 'rejected' && (
                                        <div className="app-actions">
                                            <button className="action-button primary">Reapply</button>
                                            <button className="action-button secondary">View Feedback</button>
                                        </div>
                                    )}

                                    {app.status === 'expired' && (
                                        <div className="app-actions">
                                            <button className="action-button primary">Renew Now</button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="next-steps-section">
                    <h2>What's Next?</h2>
                    <div className="tips-container">
                        <div className="tip-item">
                            <div className="tip-icon">🎯</div>
                            <div className="tip-content">
                                <h4>Keep Applications Active</h4>
                                <p>Ensure all certifications stay current. Set reminders for renewal dates 90 days in advance.</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <div className="tip-icon">📊</div>
                            <div className="tip-content">
                                <h4>Use Your Certifications</h4>
                                <p>Add certification logos to your website, proposals, and marketing materials to attract buyers.</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <div className="tip-icon">🤝</div>
                            <div className="tip-content">
                                <h4>Register in Databases</h4>
                                <p>Ensure your business is listed in all relevant supplier databases for maximum visibility.</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <div className="tip-icon">💼</div>
                            <div className="tip-content">
                                <h4>Start Contracting</h4>
                                <p>Use your certifications to bid on federal, state, and local set-aside contracts immediately.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="status-actions">
                    <button className="action-link">Back to Home</button>
                    <button className="action-link primary">Apply for More Certifications</button>
                </div>
            </div>
        </div>
    );
};

export default Status;
