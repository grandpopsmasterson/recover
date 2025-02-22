// export const handleApiError = (error: any): string => {
//     if (error.response) {
//         // Server responded with a status code outside the 2xx range
//         return error.response.data.message || 'An error occurred';
//     } else if (error.request) {
//         // Request was made but no response received
//         return 'No response from server';
//     } else {
//         // Error setting up the request
//         return 'Error setting up request';
//     }
// };

// export const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return {
//         Authorization: token ? `Bearer ${token}` : '',
//         'Content-Type': 'application/json',
//     };
// };