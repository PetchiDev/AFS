import { apiService } from './api';
import { API } from '@/config/constants';
import { MESSAGES } from '@/config/constants';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await apiService.post(
        API.ENDPOINTS.LOGIN,
        credentials
      );
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error.message || MESSAGES.ERROR.NETWORK
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await apiService.post(
        API.ENDPOINTS.REGISTER,
        userData
      );
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error.message || MESSAGES.ERROR.NETWORK
      };
    }
  },

  getUserProfile: async () => {
    try {
      const response = await apiService.get(API.ENDPOINTS.USER_PROFILE);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error.message || MESSAGES.ERROR.NETWORK
      };
    }
  }
};

export default authService;

