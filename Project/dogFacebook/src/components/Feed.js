import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const Feed = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            const querySnapshot = await getDocs(collection(db, 'blogPosts'));
            const posts = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    timestamp: data.createdAt ? data.createdAt.seconds : null,
                };
            });
            setBlogPosts(posts);
        };

        fetchBlogPosts();
    }, []);

    return (
        <div className="feed">
            <h2>Feed</h2>
            {blogPosts.map((post) => (
                <div key={post.id} className="blog-post">
                    <h3>{post.content}</h3>
                    <p>Posted by User: {post.userId}</p>
                    <p>
                        {post.timestamp 
                            ? new Date(post.timestamp * 1000).toLocaleDateString() 
                            : 'Date not available'}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Feed;
