// src/hooks/useMultiStepForm.js
import { useState } from 'react';

const useMultiStepForm = (initialData) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialData);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            petPhotos: [...formData.petPhotos, ...e.target.files]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to the server
        console.log(formData);
    };

    return {
        currentStep,
        formData,
        handleNextStep,
        handlePrevStep,
        handleChange,
        handleFileChange,
        handleSubmit
    };
};

export default useMultiStepForm;
