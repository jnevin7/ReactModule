import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Feed from '../../components/Feed';
import CreatePost from '../../components/CreatePost';
import './Home.css';

const Home = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser; 

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      {currentUser && (
        <div className="welcome-message">
          <p>Welcome, {currentUser.displayName || currentUser.email}!</p>
          <Link to={`/profile/${currentUser.uid}`}>
            <button className="button">Your Profile</button>
          </Link>
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
      )}
      <CreatePost />
      <Feed />
      {!currentUser && (
        <div>
        <Link to="/auth">
          <button className="button">Login</button>
        </Link>
        <Link to="/registration">
          <button className="button">Register</button>
        </Link>
      </div>
        
      )}
    </div>
  );
};

export default Home;
