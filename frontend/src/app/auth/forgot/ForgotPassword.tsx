import axios from "axios";

const ForgotPassword = () => {
    const handleSubmit = async (email: string) => {
        await axios.post('/api/forgot-password', { email });
        // Show success message
    };
};