import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import './Profile.css';

const Profile = () => {
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [blogPost, setBlogPost] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const docRef = doc(db, 'petProfiles', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProfileData(docSnap.data());
            } else {
                console.log('No such document!');
            }
        };

        if (id) {
            fetchProfile();
        }
    }, [id]);

    const handleCreatePost = async () => {
        try {
            const blogRef = await addDoc(collection(db, 'blogPosts'), {
                userId: id,
                content: blogPost,
                timestamp: new Date()
            });
            console.log('Blog post created with ID:', blogRef.id);
            setBlogPost('');
        } catch (error) {
            console.error('Error adding blog post: ', error);
        }
    };

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            <div className="profile-info">
                <img src={profileData.profilePhoto} alt={`${profileData.petName}'s profile`} />
                <h2>{profileData.petName}</h2>
                <p>Type: {profileData.petType}</p>
                <p>Breed: {profileData.petBreed}</p>
                <p>Age: {profileData.petAge}</p>
                <p>Gender: {profileData.petGender}</p>
                <p>Bio: {profileData.petBio}</p>
                <p>Achievements: {profileData.petAchievements}</p>
                <p>Health Records: {profileData.petHealthRecords}</p>
            </div>
            <button onClick={() => navigate('/')}>Go to Feed</button>
            <div className="blog-post-creation">
                <textarea
                    value={blogPost}
                    onChange={(e) => setBlogPost(e.target.value)}
                    placeholder="Write your blog post here"
                ></textarea>
                <button onClick={handleCreatePost}>Create Blog Post</button>
            </div>
        </div>
    );
};

export default Profile;
