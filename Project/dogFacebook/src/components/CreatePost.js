import React, { useState } from 'react';
import { db, auth } from '../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [post, setPost] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const currentUser = auth.currentUser; 
        if (!currentUser) {
          setAlertVisible(true);
            return;
        }

        try {
            await addDoc(collection(db, 'blogPosts'), {
                userId: currentUser.uid, 
                content: post,
                createdAt: new Date(),
            });
            setPost('');
            navigate('/'); 
        } catch (error) {
            console.error('Error adding post: ', error);
        }
    };

    return (
      <div>
            {alertVisible && (
                <div className="alert">
                    <p>You need to be signed in to make a post.</p>
                </div>
            )}
        <form onSubmit={handleSubmit}>
            <textarea
                value={post}
                onChange={(e) => setPost(e.target.value)}
                placeholder="What's on your mind?"
                required
            />
            <button type="submit">Post</button>
        </form>
        </div>
    );
};

export default CreatePost;
