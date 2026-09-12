import { useState, ChangeEvent } from 'react';

/**
 * Custom React hook for managing controlled form state and field updates.
 */
export function useFormState<T extends Record<string, unknown>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setValues((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const setFieldValue = (name: keyof T, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    handleChange,
    setFieldValue,
    resetForm,
  };
}
