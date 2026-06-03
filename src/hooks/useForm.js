import { useRef, useState } from 'react';

export const useForm = ({ defaultValues = {} } = {}) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const rulesRef = useRef({});

  const register = (name, rules = {}) => {
    rulesRef.current[name] = rules;

    return {
      name,
      value: values[name] ?? '',
      onChange: (event) => {
        setValues((currentValues) => ({
          ...currentValues,
          [name]: event.target.value,
        }));
      },
    };
  };

  const validate = () => {
    const nextErrors = {};

    Object.entries(rulesRef.current).forEach(([name, rules]) => {
      const value = values[name] ?? '';

      if (rules.required && !String(value).trim()) {
        nextErrors[name] = {
          message: typeof rules.required === 'string' ? rules.required : 'This field is required',
        };
        return;
      }

      if (rules.pattern && value && !rules.pattern.value.test(value)) {
        nextErrors[name] = {
          message: rules.pattern.message || 'Please enter a valid value',
        };
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (onValid) => (event) => {
    event.preventDefault();

    if (validate()) {
      onValid(values, event);
    }
  };

  const reset = (nextValues = defaultValues) => {
    setValues(nextValues);
    setErrors({});
  };

  return {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  };
};
