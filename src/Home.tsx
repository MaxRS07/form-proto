import React, { useState } from 'react';
import './Home.css';
import Questionnaire from './Questionnaire';
import { questions, QuestionnaireAnswers, Certification, initialAnswers } from './types';
import Results from './Results';

interface HomeProps {
    view: 'home' | 'questionnaire' | 'notfound';
    setView: (view: 'home' | 'questionnaire' | 'notfound') => void;
}

const Home: React.FC<HomeProps> = ({ view, setView }) => {
    const showQuestionnaire = view === 'questionnaire';
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<QuestionnaireAnswers>(initialAnswers);
    const [results, setResults] = useState<Certification[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const nextStep = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateEligibility();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const calculateEligibility = () => {
        const eligible: Certification[] = [];

        // Check if basic requirements are met
        if (answers.isCitizen !== 'Yes' || answers.businessType !== 'For-profit') {
            setResults(eligible);
            setShowResults(true);
            return;
        }

        // WOSB/EDWOSB Eligibility
        if (answers.ownerGender === 'At least 51% women-owned') {
            const isEDWOSB =
                answers.personalNetWorth === 'Less than $750,000' ||
                answers.personalNetWorth === '$750,000 - $850,000';

            eligible.push({
                name: isEDWOSB ? 'EDWOSB (Economically Disadvantaged Women-Owned Small Business)' : 'WOSB (Women-Owned Small Business)',
                type: 'Federal',
                description: 'Federal certification for women-owned small businesses',
                benefits: [
                    'Access to set-aside contracts',
                    '5% federal contracting goal ($26.64B in FY 2024)',
                    'Sole source contracts up to $4.5M-$7M',
                    'No participation time limit',
                ],
                applicationLink: 'https://certify.sba.gov',
            });
        }

        // 8(a) Business Development Program
        const isMinority = [
            'African American',
            'Hispanic American',
            'Native American',
            'Asian Pacific American',
            'Subcontinent Asian American',
        ].includes(answers.ownerEthnicity);

        if (
            isMinority &&
            (answers.yearsInBusiness === '2-5 years' ||
                answers.yearsInBusiness === '5-10 years' ||
                answers.yearsInBusiness === 'More than 10 years') &&
            answers.personalNetWorth === 'Less than $750,000' &&
            answers.avgAnnualIncome === 'Less than $400,000'
        ) {
            eligible.push({
                name: '8(a) Business Development Program',
                type: 'Federal',
                description: '9-year program for socially and economically disadvantaged businesses',
                benefits: [
                    'Sole-source contracts up to $4.5M-$7M',
                    '5% federal contracting goal',
                    'Dedicated Business Opportunity Specialist',
                    'Free consulting and technical assistance',
                ],
                applicationLink: 'https://certify.sba.gov',
            });
        }

        // CPUC Supplier Clearinghouse
        if (
            (answers.ownerGender === 'At least 51% women-owned' ||
                isMinority ||
                answers.isLGBT === 'Yes' ||
                answers.hasDisability === 'Yes') &&
            (answers.businessLocation === 'Oakland/Alameda County' ||
                answers.businessLocation === 'Contra Costa County' ||
                answers.businessLocation === 'Other California location')
        ) {
            eligible.push({
                name: 'CPUC Supplier Clearinghouse (WBE/MBE/LGBTBE)',
                type: 'California State',
                description: 'California utilities supplier diversity certification',
                benefits: [
                    'Access to $10+ billion annually from CA utilities',
                    'Visibility to 16 major utilities',
                    '20%+ procurement goals',
                    'Free certification with 3-year validity',
                ],
                applicationLink: 'https://thesupplierclearinghouse.com',
            });
        }

        // California CUCP/DBE
        if (
            isMinority &&
            answers.personalNetWorth !== 'More than $2,047,000' &&
            (answers.annualRevenue === 'Less than $5 million' ||
                answers.annualRevenue === '$5-15 million' ||
                answers.annualRevenue === '$15-30 million') &&
            (answers.businessLocation === 'Oakland/Alameda County' ||
                answers.businessLocation === 'Contra Costa County' ||
                answers.businessLocation === 'Other California location')
        ) {
            eligible.push({
                name: 'California Unified Certification Program (CUCP) - DBE/ACDBE',
                type: 'California State',
                description: 'Disadvantaged Business Enterprise for transportation projects',
                benefits: [
                    'Access to $5+ billion in CA transportation projects',
                    'Single certification valid for all USDOT grantees',
                    'Interstate certification',
                    'Set-aside opportunities',
                ],
                applicationLink: 'https://californiaucp.dbesystem.com',
            });
        }

        // California SB/DVBE
        if (
            (answers.employeeCount === '0-25 employees' ||
                answers.employeeCount === '26-100 employees') &&
            (answers.annualRevenue === 'Less than $5 million' ||
                answers.annualRevenue === '$5-15 million') &&
            (answers.businessLocation === 'Oakland/Alameda County' ||
                answers.businessLocation === 'Contra Costa County' ||
                answers.businessLocation === 'Other California location')
        ) {
            const isDVBE = answers.isDisabledVeteran === 'Yes';
            eligible.push({
                name: isDVBE ? 'California DVBE (Disabled Veteran Business Enterprise)' : 'California Small Business (SB)',
                type: 'California State',
                description: isDVBE
                    ? 'Certification for disabled veteran-owned businesses'
                    : 'Small business certification for California state contracts',
                benefits: [
                    isDVBE ? '3% state contracting goal for DVBEs' : '25% state contracting goal for SBs',
                    '5% bid preference',
                    'Prompt Payment Act benefits',
                    'Free certification',
                ],
                applicationLink: 'https://caleprocure.ca.gov',
            });
        }

        // Port of Oakland
        if (
            (answers.businessLocation === 'Oakland/Alameda County' ||
                answers.businessLocation === 'Contra Costa County') &&
            (answers.annualRevenue === 'Less than $5 million' ||
                answers.annualRevenue === '$5-15 million' ||
                answers.annualRevenue === '$15-30 million')
        ) {
            eligible.push({
                name: 'Port of Oakland - Local/Small Business',
                type: 'Local (Oakland)',
                description: 'Local and small business certification for Port of Oakland contracts',
                benefits: [
                    'Preference points on Port contracts',
                    '15-day payment terms',
                    'Free certification',
                    'Access to aviation and maritime opportunities',
                ],
                applicationLink: 'https://srd.portofoakland.com',
            });
        }

        // NMSDC
        if (isMinority) {
            eligible.push({
                name: 'NMSDC (National Minority Supplier Development Council)',
                type: 'National Private Sector',
                description: '"Gold standard" certification for minority-owned businesses',
                benefits: [
                    'Access to 1,750+ corporations',
                    'National recognition throughout U.S.',
                    'MBE Database listing',
                    'Largest B2B conferences',
                ],
                applicationLink: 'https://nmsdc.org/certifications/get-started/',
            });
        }

        // WBENC
        if (answers.ownerGender === 'At least 51% women-owned') {
            eligible.push({
                name: 'WBENC (Women\'s Business Enterprise National Council)',
                type: 'National Private Sector',
                description: 'Largest third-party certifier for women-owned businesses',
                benefits: [
                    'Access to 1,000+ corporations',
                    'National database with 13,000+ WBEs',
                    'Can add federal WOSB at no extra cost',
                    'Corporate member contacts',
                ],
                applicationLink: 'https://wbenc.wbenclink.org',
            });
        }

        setResults(eligible);
        setShowResults(true);
    };

    const resetQuestionnaire = () => {
        setView('home');
        setShowResults(false);
        setCurrentStep(0);
        setAnswers({
            businessType: '',
            ownerGender: '',
            ownerEthnicity: '',
            isVeteran: '',
            isDisabledVeteran: '',
            employeeCount: '',
            annualRevenue: '',
            businessLocation: '',
            yearsInBusiness: '',
            personalNetWorth: '',
            avgAnnualIncome: '',
            isLGBT: '',
            hasDisability: '',
            isCitizen: '',
        });
        setResults([]);
    };

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="home-container">
            {!showQuestionnaire && !showResults && (
                <div className="hero-section">
                    <h1>Business Certification Eligibility Finder</h1>
                    <p className="subtitle">
                        Discover which federal, state, and local certifications your business qualifies for
                    </p>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">🏛️</div>
                            <h3>Federal Certifications</h3>
                            <p>WOSB, EDWOSB, and 8(a) programs providing access to billions in federal contracts</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">🌉</div>
                            <h3>California State</h3>
                            <p>CPUC, CUCP, and SB/DVBE certifications for state and utility contracts</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">🚢</div>
                            <h3>Local Oakland</h3>
                            <p>Port of Oakland certification for local contracting opportunities</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">🤝</div>
                            <h3>Private Sector</h3>
                            <p>NMSDC and WBENC for Fortune 500 corporate supply chain access</p>
                        </div>
                    </div>
                    <button className="cta-button" onClick={() => setView('questionnaire')}>
                        Start Eligibility Questionnaire
                    </button>
                    <p className="info-text">
                        Takes about 5 minutes • Oakland, California & Federal programs
                    </p>
                </div>
            )}

            {showQuestionnaire && !showResults && (
                <Questionnaire
                    currentStep={currentStep}
                    questions={questions}
                    answers={answers as any}
                    onAnswerChange={handleAnswerChange}
                    onNext={nextStep}
                    onPrev={prevStep}
                    onBack={() => setView('home')}
                />
            )}

            {showResults && (
                <Results results={results} onStartOver={resetQuestionnaire} />
            )}
        </div>
    );
};

export default Home;
