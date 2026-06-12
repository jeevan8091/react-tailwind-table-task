// EmployeeWizard.jsx – Updated UI with professional stepper and progress bar
import React, { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import AddressDetails from './AddressDetails';
import EmploymentDetails from './EmploymentDetails';
import ReviewSubmit from './ReviewSubmit';
import { validatePersonal, validateAddress, validateEmployment } from './Validation';

function EmployeeWizard() {
  // Step numbers: 1‑Personal, 2‑Address, 3‑Employment, 4‑Review & Submit
  const [step, setStep] = useState(1);

  // Centralised form data holding all wizard fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    department: '',
    designation: '',
    salary: '',
  });

  // Validation errors for the currently visible step
  const [errors, setErrors] = useState({});

  /** Generic change handler for input fields */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field as the user types
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  /** Validate the data for the current step */
  const validateCurrentStep = () => {
    let stepErrors = {};
    if (step === 1) {
      stepErrors = validatePersonal(formData);
    } else if (step === 2) {
      stepErrors = validateAddress(formData);
    } else if (step === 3) {
      stepErrors = validateEmployment(formData);
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    // Preserve current errors but allow navigation back
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Render the appropriate step component with required props
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            step={step}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <AddressDetails
            step={step}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <EmploymentDetails
            step={step}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return <ReviewSubmit data={formData} onPrev={handlePrev} />;
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
}

export default EmployeeWizard;
