// API Configuration
export const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  TIMEOUT: 30000,
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    USER_PROFILE: '/user/profile',
    POSTS: '/posts',
    COMMENTS: '/comments'
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

