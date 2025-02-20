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
  };
  
  export const thirdPartyConfig = {
    ...baseConfig,
    withCredentials: false,
    timeout: 30000,
  };