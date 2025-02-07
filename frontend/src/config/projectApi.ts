import apiClient from '../api/apiClient';

// Function to create a project with multipart/form-data
export const createProject = async (formData: FormData, customHeaders: Record<string, string> = {}) => {
    try {
        const response = await apiClient.post('/projects', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...customHeaders, // Allow overriding or adding additional headers
        },
    });
    return response;
    } catch (error) {
        console.error('Create project error:', error);
        throw error;
    }
};
