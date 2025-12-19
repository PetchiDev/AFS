import { useMutation } from '@tanstack/react-query';
import analysisService from '@/services/analysis.service';

/**
 * Custom hook for running risk analysis
 * @returns {Object} Mutation object for running analysis
 */
export const useRunAnalysis = () => {
    return useMutation({
        mutationFn: (payload) => analysisService.runAnalysis(payload),
        onSuccess: (data) => {
            // You can add global success handling here if needed, e.g. toast notification
            console.log('Analysis completed successfully:', data);
        },
        onError: (error) => {
            // You can add global error handling here if needed
            console.error('Analysis failed:', error);
        }
    });
};
