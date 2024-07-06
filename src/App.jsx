import React, { useState } from 'react';
import './App.css';
import Data from './components/Data';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import { auth, provider } from './FirebaseConfig';

function App() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then((result) => setUser(result.user))
      .catch((err) => alert(err));
  };

  return (
    <>
      {user ? (
        <>
          <Header photoURL={user.photoURL} />
          <div className="App">
            <Sidebar />
            <Data />
          </div>
        </>
      ) : (
        <div className="login-wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png"
            alt="gdrive"
          />
          <button onClick={signIn}>Login to Google Drive</button>
        </div>
      )}
    </>
  );
}

export default App;
