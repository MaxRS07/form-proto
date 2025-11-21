export interface QuestionnaireAnswers {
  businessType: string;
  ownerGender: string;
  ownerEthnicity: string;
  isVeteran: string;
  isDisabledVeteran: string;
  employeeCount: string;
  annualRevenue: string;
  businessLocation: string;
  yearsInBusiness: string;
  personalNetWorth: string;
  avgAnnualIncome: string;
  isLGBT: string;
  hasDisability: string;
  isCitizen: string;
}

export interface Question {
  id: keyof QuestionnaireAnswers;
  question: string;
  type: string;
  options: string[];
}

export interface Certification {
  name: string;
  type: string;
  description: string;
  benefits: string[];
  applicationLink: string;
}

export const questions: Question[] = [
  {
    id: 'isCitizen',
    question: 'Are you a U.S. citizen or legal resident?',
    type: 'radio',
    options: ['Yes', 'No'],
  },
  {
    id: 'businessType',
    question: 'What type of business do you have?',
    type: 'radio',
    options: ['For-profit', 'Non-profit', 'Not yet established'],
  },
  {
    id: 'ownerGender',
    question: 'What is the gender composition of business ownership?',
    type: 'radio',
    options: [
      'At least 51% women-owned',
      'At least 51% men-owned',
      'Mixed ownership',
    ],
  },
  {
    id: 'ownerEthnicity',
    question: 'What is the ethnicity of the majority owner(s)?',
    type: 'radio',
    options: [
      'African American',
      'Hispanic American',
      'Native American',
      'Asian Pacific American',
      'Subcontinent Asian American',
      'Caucasian/White',
      'Other',
    ],
  },
  {
    id: 'isVeteran',
    question: 'Is the majority owner a veteran?',
    type: 'radio',
    options: ['Yes', 'No'],
  },
  {
    id: 'isDisabledVeteran',
    question: 'Is the majority owner a disabled veteran?',
    type: 'radio',
    options: ['Yes', 'No', 'Not applicable'],
  },
  {
    id: 'isLGBT',
    question: 'Is the business at least 51% owned by LGBT individuals?',
    type: 'radio',
    options: ['Yes', 'No'],
  },
  {
    id: 'hasDisability',
    question: 'Is the business owned by persons with disabilities?',
    type: 'radio',
    options: ['Yes', 'No'],
  },
  {
    id: 'businessLocation',
    question: 'Where is your business located?',
    type: 'radio',
    options: [
      'Oakland/Alameda County',
      'Contra Costa County',
      'Other California location',
      'Outside California',
    ],
  },
  {
    id: 'employeeCount',
    question: 'How many employees does your business have?',
    type: 'radio',
    options: [
      '0-25 employees',
      '26-100 employees',
      '101-500 employees',
      '500+ employees',
    ],
  },
  {
    id: 'annualRevenue',
    question: 'What is your average annual gross revenue (last 3 years)?',
    type: 'radio',
    options: [
      'Less than $5 million',
      '$5-15 million',
      '$15-30 million',
      'More than $30 million',
    ],
  },
  {
    id: 'yearsInBusiness',
    question: 'How long has your business been operating?',
    type: 'radio',
    options: [
      'Less than 2 years',
      '2-5 years',
      '5-10 years',
      'More than 10 years',
    ],
  },
  {
    id: 'personalNetWorth',
    question: 'What is your personal net worth (excluding primary residence and business ownership)?',
    type: 'radio',
    options: [
      'Less than $750,000',
      '$750,000 - $850,000',
      '$850,000 - $2,047,000',
      'More than $2,047,000',
    ],
  },
  {
    id: 'avgAnnualIncome',
    question: 'What is your average adjusted gross income (last 3 years)?',
    type: 'radio',
    options: [
      'Less than $400,000',
      '$400,000 or more',
    ],
  },
];

export const initialAnswers: QuestionnaireAnswers = {
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
};
