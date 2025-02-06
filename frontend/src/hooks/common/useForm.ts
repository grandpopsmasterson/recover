import { useState } from "react";

export const useForm = <T extends object>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues(prev => ({ ...prev, [name]: value }));
    };
  
    return {
      values,
      errors,
      handleChange,
      setValues,
      setErrors
    };
  };