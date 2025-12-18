import { apiConfig } from '@/config/api.config';
import { API } from '@/config/constants';

export const apiService = {
  get: (endpoint) => apiConfig.get(endpoint),
  
  post: (endpoint, data) => apiConfig.post(endpoint, data),
  
  put: (endpoint, data) => apiConfig.put(endpoint, data),
  
  delete: (endpoint) => apiConfig.delete(endpoint)
};

export default apiService;

