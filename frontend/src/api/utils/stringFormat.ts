export const stringFormat = (s: string) => {
    if (!s) return;
    return s.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
}

export const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return dateString;
    }
    
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}