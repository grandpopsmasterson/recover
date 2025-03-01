export const validateEmail = (email: string): boolean => {
    // example@email.format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/i;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,50}$/;
    return passwordRegex.test(password);
};

export const validateUsername = (username: string): boolean => {
    // 3-20 characters, letters, numbers, underscores, hyphens
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernameRegex.test(username);
};

export const validatePhonenumber = (phonenumber: string): boolean => {
    // 10 digits, no +1 at start, any format
    const phoneRegex = /^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phonenumber);
}

export const validateDate = (date:string): boolean => {
    // mm/dd/yyyy
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/([12]\d{3})$/;
    return dateRegex.test(date)
}