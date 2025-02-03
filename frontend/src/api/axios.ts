import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_BASE_URL, // adjust port as needed
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;