import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'bootstrap/dist/css/bootstrap.min.css';

const config = {
  apiKey: "AIzaSyA_zuF1lyleOeF-iRTiZ8VdlnmDHnRsREE",
  authDomain: "myfirstreactproject-8b308.firebaseapp.com",
  projectId: "myfirstreactproject-8b308",
  storageBucket: "myfirstreactproject-8b308.appspot.com",
  messagingSenderId: "434347483883",
  appId: "1:434347483883:web:4f5561f8deaafbb6cfd4ae",
  measurementId: "G-WK1N1Q8RRW"
};
firebase.initializeApp(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
