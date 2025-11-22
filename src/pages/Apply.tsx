import React, { useState } from 'react';
import { BuisnessDataModel, BusinessEntityType, Ethnicity, Gender, USState } from '../typing/content';
import './Apply.css';

interface FormData {
    nameFirst: string;
    nameLast: string;
    businessName: string;
    dbaName: string;
    businessType: string;
    taxNumber: string;
    ethnicity: string;
    gender: string;
    email: string;
    phone: string;
    fax: string;
    website: string;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    zip: string;
}

const Apply: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        nameFirst: '',
        nameLast: '',
        businessName: '',
        dbaName: '',
        businessType: '',
        taxNumber: '',
        ethnicity: '',
        gender: '',
        email: '',
        phone: '',
        fax: '',
        website: '',
        addressStreet: '',
        addressCity: '',
        addressState: '',
        zip: '',
    });

    const sections = [
        {
            title: 'Personal Information',
            description: 'Tell us about yourself',
            fields: ['nameFirst', 'nameLast', 'gender', 'ethnicity'],
        },
        {
            title: 'Business Information',
            description: 'Tell us about your business',
            fields: ['businessName', 'dbaName', 'businessType', 'taxNumber'],
        },
        {
            title: 'Contact Details',
            description: 'How can we reach you?',
            fields: ['email', 'phone', 'fax', 'website'],
        },
        {
            title: 'Business Address',
            description: 'Where is your business located?',
            fields: ['addressStreet', 'addressCity', 'addressState', 'zip'],
        },
    ];

    const businessTypes = Object.values(BusinessEntityType) as string[];
    const ethnicities = Object.values(Ethnicity) as string[];
    const genders = Object.values(Gender) as string[];
    const states = Object.values(USState) as string[]; const currentSection = sections[currentStep];
    const progress = ((currentStep + 1) / sections.length) * 100;

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const isCurrentSectionComplete = currentSection.fields.every(
        (field) => formData[field as keyof FormData]
    );

    const handleNext = () => {
        if (currentStep < sections.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Form submitted with data:', formData);
        alert('Application submitted! Check the console for details.');
    };

    const renderField = (fieldName: string) => {
        switch (fieldName) {
            case 'nameFirst':
                return (
                    <label className="form-group">
                        <span className="label-text">First Name *</span>
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            value={formData.nameFirst}
                            onChange={(e) => handleInputChange('nameFirst', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'nameLast':
                return (
                    <label className="form-group">
                        <span className="label-text">Last Name *</span>
                        <input
                            type="text"
                            placeholder="Enter your last name"
                            value={formData.nameLast}
                            onChange={(e) => handleInputChange('nameLast', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'businessName':
                return (
                    <label className="form-group">
                        <span className="label-text">Business Name *</span>
                        <input
                            type="text"
                            placeholder="Enter your business name"
                            value={formData.businessName}
                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'dbaName':
                return (
                    <label className="form-group">
                        <span className="label-text">DBA Name (if applicable)</span>
                        <input
                            type="text"
                            placeholder="Doing Business As name"
                            value={formData.dbaName}
                            onChange={(e) => handleInputChange('dbaName', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'businessType':
                return (
                    <label className="form-group">
                        <span className="label-text">Business Entity Type *</span>
                        <select
                            value={formData.businessType}
                            onChange={(e) => handleInputChange('businessType', e.target.value)}
                            className="form-input"
                        >
                            <option value="">Select business type...</option>
                            {businessTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>
                );
            case 'taxNumber':
                return (
                    <label className="form-group">
                        <span className="label-text">Tax ID / EIN *</span>
                        <input
                            type="text"
                            placeholder="XX-XXXXXXX"
                            value={formData.taxNumber}
                            onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'gender':
                return (
                    <label className="form-group">
                        <span className="label-text">Gender *</span>
                        <select
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="form-input"
                        >
                            <option value="">Select gender...</option>
                            {genders.map((g) => (
                                <option key={g} value={g}>
                                    {g}
                                </option>
                            ))}
                        </select>
                    </label>
                );
            case 'ethnicity':
                return (
                    <label className="form-group">
                        <span className="label-text">Ethnicity *</span>
                        <select
                            value={formData.ethnicity}
                            onChange={(e) => handleInputChange('ethnicity', e.target.value)}
                            className="form-input"
                        >
                            <option value="">Select ethnicity...</option>
                            {ethnicities.map((e) => (
                                <option key={e} value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </label>
                );
            case 'email':
                return (
                    <label className="form-group">
                        <span className="label-text">Email *</span>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'phone':
                return (
                    <label className="form-group">
                        <span className="label-text">Phone *</span>
                        <input
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'fax':
                return (
                    <label className="form-group">
                        <span className="label-text">Fax</span>
                        <input
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.fax}
                            onChange={(e) => handleInputChange('fax', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'website':
                return (
                    <label className="form-group">
                        <span className="label-text">Website</span>
                        <input
                            type="url"
                            placeholder="https://example.com"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'addressStreet':
                return (
                    <label className="form-group">
                        <span className="label-text">Street Address *</span>
                        <input
                            type="text"
                            placeholder="123 Main St"
                            value={formData.addressStreet}
                            onChange={(e) => handleInputChange('addressStreet', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'addressCity':
                return (
                    <label className="form-group">
                        <span className="label-text">City *</span>
                        <input
                            type="text"
                            placeholder="Oakland"
                            value={formData.addressCity}
                            onChange={(e) => handleInputChange('addressCity', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            case 'addressState':
                return (
                    <label className="form-group">
                        <span className="label-text">State *</span>
                        <select
                            value={formData.addressState}
                            onChange={(e) => handleInputChange('addressState', e.target.value)}
                            className="form-input"
                        >
                            <option value="">Select state...</option>
                            {states.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </label>
                );
            case 'zip':
                return (
                    <label className="form-group">
                        <span className="label-text">ZIP Code *</span>
                        <input
                            type="text"
                            placeholder="94607"
                            value={formData.zip}
                            onChange={(e) => handleInputChange('zip', e.target.value)}
                            className="form-input"
                        />
                    </label>
                );
            default:
                return null;
        }
    };

    return (
        <div className="apply-page">
            <div className="apply-container">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>

                <h1 className="apply-title">Application Form</h1>
                <p className="progress-text">
                    Section {currentStep + 1} of {sections.length}
                </p>

                <div className="section-card">
                    <h2>{currentSection.title}</h2>
                    <p className="section-description">{currentSection.description}</p>

                    <div className="form-fields">
                        {currentSection.fields.map((field) => (
                            <div key={field} className="field-wrapper">
                                {renderField(field)}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="navigation-buttons">
                    <button
                        className="nav-button secondary"
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="nav-button primary"
                        onClick={handleNext}
                        disabled={!isCurrentSectionComplete}
                    >
                        {currentStep === sections.length - 1 ? 'Submit Application' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Apply;
