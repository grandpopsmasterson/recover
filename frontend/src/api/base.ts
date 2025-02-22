const getAuthHeader = () => {
  if (typeof window !== 'undefined') {  // Check if we're on the client side
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};  // Return empty object on server side
};
  export const baseConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    timeout: 10000,
    timeoutErrorMessage: 'Request timed out'
  };
  
  export const apiConfig = {
    ...baseConfig,
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
      ...baseConfig.headers,
      ...getAuthHeader()
    }
  };
  
  export const thirdPartyConfig = {
    ...baseConfig,
    withCredentials: false,
    timeout: 30000,
  };