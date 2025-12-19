import axios from 'axios';
import { API } from '@/config/constants';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API.BASE_URL,
    timeout: API.TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for auth token if needed (keeping it ready for future)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const analysisService = {
    /**
     * Run risk analysis for a company
     * @param {Object} payload - Company information
     * @param {string} payload.companyName
     * @param {string} payload.companyemail
     * @param {string} payload.companyphonenumber
     * @param {string} payload.practicearea
     * @returns {Promise<Object>} Analysis result
     */
    runAnalysis: async (payload) => {
        try {
            const response = await apiClient.post(API.ENDPOINTS.RISK_ANALYSIS, payload);
            return response.data;
        } catch (error) {
            // Improve error object for the UI
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new Error(error.response.data.message || 'Server error occurred during analysis');
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('No response from server. Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(error.message || 'Error initiating analysis');
            }
        }
    }
};

export default analysisService;
