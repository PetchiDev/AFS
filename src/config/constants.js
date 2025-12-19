// API Configuration
export const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://attorneymatching-api-dpecfebsb7a9ggf9.southindia-01.azurewebsites.net',
  TIMEOUT: 30000,
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    USER_PROFILE: '/user/profile',
    POSTS: '/posts',
    COMMENTS: '/comments',
    RISK_ANALYSIS: '/api/v1/risk-analysis'
  }
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'My React App',
  VERSION: '1.0.0',
  LANGUAGE: 'en',
  THEME: 'light'
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 20,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[0-9]{10}$/
};

// UI Constants
export const UI = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  MAX_FILE_SIZE: 5242880, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ITEMS_PER_PAGE: 10
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  MOBILE_SMALL: 360,
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  DESKTOP_LARGE: 1440
};

// File Upload Constants
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10485760, // 10MB
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_DOCUMENT_EXTENSIONS: ['.pdf', '.doc', '.docx'],
  UPLOAD_TEXT: 'Click to upload documents',
  SUPPORTED_FORMATS_TEXT: 'PDF, DOC, DOCX'
};

// Messages
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful!',
    LOGOUT: 'Logged out successfully!',
    SAVE: 'Data saved successfully!'
  },
  ERROR: {
    GENERIC: 'Something went wrong!',
    NETWORK: 'Network error. Please try again.',
    UNAUTHORIZED: 'You are not authorized.',
    INVALID_EMAIL: 'Please enter a valid email address.'
  }
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'app_theme',
  LANGUAGE: 'app_language'
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  NEW_ANALYSIS: '/new-analysis',
  KNOWLEDGE_HUB: '/knowledge-hub',
  REPORTS: '/reports',
  ATTORNEY_DIRECTORY: '/attorney-directory',
  ATTORNEY_PROFILE: '/attorney-directory/$attorneyId',
  EMAIL_DRAFTS: '/email-drafts',
  CUSTOMER_DETAILS: '/customer-details',
  HELP_RESOURCES: '/help-resources',
  SETTINGS: '/settings',
  ADMIN_PANEL: '/admin-panel'
};

// Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

// Practice Areas
export const PRACTICE_AREAS = [
  'Corporate & Commercial Law',
  'Mergers & Acquisitions (M&A)',
  'Litigation & Dispute Resolution',
  'Intellectual Property Law',
  'Employment & Labor Law',
  'Real Estate & Property Law',
  'Banking & Finance Law',
  'Tax Law',
  'Regulatory & Compliance Law',
  'Data Protection & Privacy Law'
];

// Color Constants
export const COLORS = {
  PRIMARY: '#EE202E',
  TEXT: '#65758B',
  WHITE: '#FFFFFF'
};

// New Analysis Form Labels
export const NEW_ANALYSIS = {
  TITLE: 'Start a New Analysis',
  SUBTITLE: 'Use this tool to identify legal risks and recommend the best internal attorney for the selected company.',
  COMPANY_INFORMATION: 'Company Information',
  COMPANY_NAME: 'Company Name',
  COMPANY_NAME_HINT: 'Start typing to see autocomplete suggestions',
  COMPANY_EMAIL: 'Company Email ID',
  COMPANY_PHONE: 'Company Phone Number',
  PRACTICE_AREA: 'Practice Area',
  PRACTICE_AREA_HINT: 'Choose the practice area you want the system to focus on.',
  RUN_ANALYSIS: 'Run Analysis',
  SUPPORTING_ATTACHMENT: 'Supporting Attachment',
  INCLUDE_INTERNAL_DOCS: 'Include internal documents',
  INCLUDE_PUBLIC_NEWS: 'Include public news sources',
  USE_PAST_MATTERS: 'Use past matters for attorney scoring'
};

// Sidebar Labels
export const SIDEBAR_CONSTANTS = {
  NEW_ANALYSIS: 'New Analysis',
  KNOWLEDGE_HUB: 'Knowledge Hub',
  REPORTS: 'Reports',
  ATTORNEY_DIRECTORY: 'Attorney Directory',
  EMAIL_DRAFTS: 'Email Drafts',
  CUSTOMER_DETAILS: 'Customer Details',
  HELP_RESOURCES: 'Help & Resources',
  SETTINGS: 'Settings',
  ADMIN_PANEL: 'Admin Panel'
};

// Email Draft Constants
export const EMAIL_DRAFT = {
  BACK_TO_DRAFTS: 'Back to Email Drafts',
  TITLE_PREFIX: 'Email Draft for:',
  TO_LABEL: 'To:',
  SUBJECT_LABEL: 'Subject',
  EMAIL_BODY_LABEL: 'Email Body',
  COPY_EMAIL: 'Copy Email',
  SEND_VIA_OUTLOOK: 'Send via Outlook',
  SAVE_DRAFT: 'Save Draft',
  COMPANY_SUMMARY: 'Company Summary',
  KEY_RISKS: 'Key Risks',
  RECOMMENDED_ATTORNEY: 'Recommended Attorney',
  NAME_LABEL: 'Name',
  PRACTICE_AREA_LABEL: 'Practice Area',
  CONFIDENCE_SCORE_LABEL: 'Confidence Score',
  PAST_MATTERS_LABEL: 'Past Matters:',
  VIEW_PROFILE: 'View Profile',
  DEFAULT_COMPANY_NAME: 'Acme Manufacturing',
  DEFAULT_RECIPIENT_NAME: 'A.K. Raman',
  DEFAULT_RECIPIENT_TITLE: 'Partner, Corporate',
  DEFAULT_SUBJECT: 'Re: Compliance risks identified for Acme Manufacturing',
  DEFAULT_EMAIL_BODY: `Hi A.K. ABC company,

Our analysis for Acme Manufacturing identified three key compliance-related risks:
• Environmental permit gaps
• Supplier contract exposure
• Potential employee misclassification

Based on your experience with compliance and manufacturing clients, you appear to be the best internal expert to support this matter.

Please let me know if you'd like a meeting arranged.

Regards,
John`
};

export const REPORTS_CONSTANTS = {
  TITLE: 'Reports',
  SUBTITLE: 'View all past analysis reports.',
  SEARCH_PLACEHOLDER: 'Search company...',
  ALL_PRACTICE_AREAS: 'All Practice Areas',
  VIEW_ACTION: 'View'
};

export const REPORT_FILTERS = {
  PRACTICE_AREAS: ['Compliance', 'Corporate', 'Employment', 'Litigation', 'IP'],
  DATE_RANGES: ['Last 30 days', 'Last 60 days', 'Last 90 days'],
  SORT_OPTIONS: ['Latest First', 'Oldest First']
};

// Help & Resources Constants
export const HELP_RESOURCES = {
  TITLE: 'Help & Resources',
  SUBTITLE: 'Find documentation, tutorials, and support for the AFS Collaboration Hub.',
  CARDS: {
    HOW_IT_WORKS: {
      TITLE: 'How It Works',
      DESCRIPTION: 'Learn how to run an analysis and understand the generated report.',
      BUTTON_TEXT: 'Learn More',
      ICON_TYPE: 'lightbulb'
    },
    UNDERSTANDING_REPORT: {
      TITLE: 'Understanding the Report',
      DESCRIPTION: 'Explanation of risk areas, confidence score, and attorney recommendations.',
      BUTTON_TEXT: 'Learn More',
      ICON_TYPE: 'document'
    },
    FAQS: {
      TITLE: 'FAQs',
      DESCRIPTION: 'Answers to commonly asked questions.',
      BUTTON_TEXT: 'Learn More',
      ICON_TYPE: 'question'
    },
    CONTACT_SUPPORT: {
      TITLE: 'Contact Support',
      DESCRIPTION: 'Reach out to the internal support team for assistance.',
      BUTTON_TEXT: 'Learn More',
      ICON_TYPE: 'support'
    }
  }
};

export const MOCK_REPORTS_DATA = [
  {
    companyName: 'Acme Manufacturing',
    practiceArea: 'Compliance',
    date: 'Jan 12, 2024',
    confidence: 92,
    id: 1
  },
  {
    companyName: 'NextGen Pharma',
    practiceArea: 'Corporate',
    date: 'Jan 10, 2024',
    confidence: 87,
    id: 2
  },
  {
    companyName: 'Bluestone Media',
    practiceArea: 'Employment',
    date: 'Jan 09, 2024',
    confidence: 78,
    id: 3
  },
  {
    companyName: 'Orion Logistics',
    practiceArea: 'Litigation',
    date: 'Jan 07, 2024',
    confidence: 85,
    id: 4
  },
  {
    companyName: 'TechVentures Inc',
    practiceArea: 'IP',
    date: 'Jan 05, 2024',
    confidence: 91,
    id: 5
  },
  {
    companyName: 'Global Finance Corp',
    practiceArea: 'Compliance',
    date: 'Jan 03, 2024',
    confidence: 76,
    id: 6
  }
];

// Customer Details Constants
export const CUSTOMER_DETAILS_CONSTANTS = {
  TITLE: 'Customer Details',
  SUBTITLE: 'View customer contact information created within the system.',
  TABLE_HEADERS: {
    SNO: 'S.NO',
    CUSTOMER_NAME: 'Customer Name',
    PHONE_NUMBER: 'Phone Number',
    CREATED_ON: 'Created On',
    ACTION: 'Action'
  },
  ACTIONS: {
    DELETE: 'Delete'
  },
  MODAL: {
    CONFIRM_TITLE: 'Confirm Delete',
    CONFIRM_MESSAGE: 'Are you Confirm to delete',
    CANCEL_BUTTON: 'Cancel',
    OK_BUTTON: 'Ok'
  }
};

// Mock Customer Data
export const MOCK_CUSTOMERS_DATA = [
  {
    id: 1,
    sno: '01',
    customerName: 'Acme Manufacturing',
    phoneNumber: '+91 98765 4321',
    createdOn: '12 Jan 2025'
  },
  {
    id: 2,
    sno: '02',
    customerName: 'Orion Industries',
    phoneNumber: '+91 98765 4321',
    createdOn: '10 Jan 2025'
  },
  {
    id: 3,
    sno: '03',
    customerName: 'Global Tech Ltd.',
    phoneNumber: '+91 98765 4321',
    createdOn: '08 Jan 2025'
  }
];

// Email Drafts Page Constants
export const EMAIL_DRAFTS_CONSTANTS = {
  TITLE: 'Email Drafts',
  SUBTITLE: 'View and continue working on email drafts generated by AI.',
  SEARCH_PLACEHOLDER: 'Search drafts...',
  TABLE_HEADERS: {
    COMPANY: 'Company',
    ATTORNEY: 'Attorney',
    SUBJECT: 'Subject',
    DATE: 'Date',
    ACTION: 'Action'
  },
  ACTIONS: {
    OPEN: 'Open'
  }
};

