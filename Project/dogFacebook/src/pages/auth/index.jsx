import React from 'react';
import { auth, provider } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

const Auth = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem('auth', JSON.stringify(authInfo));
            navigate(`/profile/${authInfo.userID}`);
        } catch (error) {
            console.error('Error signing in with Google:', error.message);
        }
    };

    return (
        <div className="login-page">
            <p>Sign In With Google</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign In With Google
            </button>
        </div>
    );
};

export default Auth;
