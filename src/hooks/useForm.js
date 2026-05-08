import { useState } from "react";

export default function useForm(defaults, schema, onSubmit) {
  const [values, setValues] = useState(defaults);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    setErrors({});
    
    // Validation
    const result = schema.safeParse(values);
    
    // Failure
    if (!result.success) {
      // Set errors in component
      result.error.issues.forEach(err => {
        setErrors(prev => ({ ...prev, [err.path[0]]: err.message}))
      });
      setIsSubmitting(false);
      return;
    }

    // Success
    onSubmit(values);
  };

  const setBackEndErrors = (field, value) => {
    setErrors(prev => ({...prev, [field]: value}))
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setValues(defaults);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleInput,
    handleSubmit,
    setBackEndErrors,
    setIsSubmitting,
    resetForm
  };
}