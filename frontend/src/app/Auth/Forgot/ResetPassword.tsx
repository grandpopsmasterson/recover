import axios from "axios";

const ResetPassword = () => {
    // Get token from URL
    const token = new URLSearchParams(window.location.search).get('token');
    
    const handleSubmit = async (newPassword: string, email: string) => {
        try {
            await axios.post('/api/reset-password', {
                token,
                newPassword,
                email
            });
            // Show success message
        } catch (error) {
            // Handle expired/invalid token
        }
    };
};