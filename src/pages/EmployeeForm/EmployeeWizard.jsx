
import React, { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import { toast } from 'react-hot-toast';
import AddressDetails from './AddressDetails';
import EmploymentDetails from './EmploymentDetails';
import ReviewSubmit from './ReviewSubmit';
import { validatePersonal, validateAddress, validateEmployment } from './Validation';

function EmployeeWizard() {
  // Step numbers: 1‑Personal, 2‑Address, 3‑Employment, 4‑Review & Submit
  const [step, setStep] = useState(1);

  // Centralised form data holding all wizard fields
  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);

  // Validation errors for the currently visible step
  const [errors, setErrors] = useState({});

  /* Generic change handler for input fields */
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
        return <ReviewSubmit data={formData} onPrev={handlePrev} onSubmit={handleFinalSubmit} />;
      default:
        return null;
    }
  };

  // Final submission handling
  const handleFinalSubmit = () => {
    console.log('Employee form submitted:', formData);
    toast.success('Employee registration completed successfully.', {
      duration: 4000,
    });
    // Reset form and wizard state
    setFormData(initialFormData);
    setStep(1);
    setErrors({});
  };

  return <>{renderStep()}</>;
}

export default EmployeeWizard;
