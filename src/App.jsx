import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect } from 'react';
import './App.css';
import Data from './components/Data';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { auth } from './FirebaseConfig';

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user is signed in');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Sign up successful:', userCredential.user);
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };

  const handleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Sign in successful:', userCredential.user);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  return (
    <>
      <Header />
      <div className="app">
        <SideBar />
      </div>
      <Data />
    </>
  );
}

export default App;
