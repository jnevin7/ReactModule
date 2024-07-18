import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../config/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './MultiStepForm.css';


const MultiStepForm = () => {
    const initialData = {
        username: '',
        email: '',
        password: '',
        petName: '',
        petType: '',
        petBreed: '',
        petAge: '',
        petGender: '',
        petBio: '',
        petPhotos: [],
        petAchievements: '',
        petHealthRecords: ''
    };

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialData);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
    const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setFormData({ ...formData, petPhotos: [...e.target.files] });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.log('User not authenticated');
            return;
        }

        try {
            await setDoc(doc(db, 'petProfiles', user.uid), formData);
            navigate(`/profile/${user.uid}`);
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 formData={formData} handleChange={handleChange} />;
            case 2:
                return <Step2 formData={formData} handleChange={handleChange} />;
            case 3:
                return <Step3 formData={formData} handleFileChange={handleFileChange} />;
            case 4:
                return <Step4 formData={formData} handleChange={handleChange} />;
            default:
                return <Step1 formData={formData} handleChange={handleChange} />;
        }
    };

    return (
        <div className="multi-step-form">
            <form onSubmit={handleSubmit}>
                {renderStep()}
                <div className="navigation-buttons">
                    {currentStep > 1 && <button type="button" onClick={handlePrevStep}>Back</button>}
                    {currentStep < 4 && <button type="button" onClick={handleNextStep}>Next</button>}
                    {currentStep === 4 && <button type="submit">Submit</button>}
                </div>
            </form>
        </div>
    );
};

const Step1 = ({ formData, handleChange }) => (
    <div>
        <h2>Step 1: User Information</h2>
        <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
    </div>
);

const Step2 = ({ formData, handleChange }) => (
    <div>
        <h2>Step 2: Pet Information</h2>
        <label>
            Pet Name:
            <input type="text" name="petName" value={formData.petName} onChange={handleChange} />
        </label>
        <label>
            Pet Type:
            <input type="text" name="petType" value={formData.petType} onChange={handleChange} />
        </label>
        <label>
            Breed:
            <input type="text" name="petBreed" value={formData.petBreed} onChange={handleChange} />
        </label>
        <label>
            Age:
            <input type="text" name="petAge" value={formData.petAge} onChange={handleChange} />
        </label>
        <label>
            Gender:
            <select name="petGender" value={formData.petGender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </label>
        <label>
            Bio:
            <textarea name="petBio" value={formData.petBio} onChange={handleChange}></textarea>
        </label>
    </div>
);

const Step3 = ({ handleFileChange }) => (
    <div>
        <h2>Step 3: Pet Photos</h2>
        <label>
            Photos:
            <input type="file" name="petPhotos" multiple onChange={handleFileChange} />
        </label>
    </div>
);

const Step4 = ({ formData, handleChange }) => (
    <div>
        <h2>Step 4: Pet Achievements & Health Records</h2>
        <label>
            Achievements:
            <textarea name="petAchievements" value={formData.petAchievements} onChange={handleChange}></textarea>
        </label>
        <label>
            Health Records:
            <textarea name="petHealthRecords" value={formData.petHealthRecords} onChange={handleChange}></textarea>
        </label>
    </div>
);

export default MultiStepForm;
