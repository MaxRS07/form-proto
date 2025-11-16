import { QuestionnaireAnswers, Certification } from './types';

export const calculateEligibility = (answers: QuestionnaireAnswers): Certification[] => {
  const eligible: Certification[] = [];

  // Check if basic requirements are met
  if (answers.isCitizen !== 'Yes' || answers.businessType !== 'For-profit') {
    return eligible;
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

  return eligible;
};
