import React, { useState } from 'react';
import FetchMgmt from '../components/FetchMgmt';
import UpdateUserButton from '../components/UpdateUserButton';
import { Link } from 'react-router-dom';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const providersNames = [
  'capsule',
];

const buttonStyles = {
  padding: '10px 20px',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1.2rem',
  marginRight: '10px'
};

const buttonContainerStyles = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const containerStyles = {
  fontFamily: 'Arial',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  background: 'linear-gradient(to bottom right, #00ccff, #cc00ff)'
};

const navStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px'
};

const pageTitleStyles = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '20px'
};

const pageSubTitleStyles = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'whitg',
  marginBottom: '20px'
};

const LoginButton = (props) => <a href={`${backendUrl}/api/connect/capsule`}>
  <button style={buttonStyles}>Connect using Capsule</button>
  </a>;
const LogoutButton = (props) => <button style={buttonStyles} onClick={props.onClick}>Logout</button>;




const Home = (props) => {

  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));


  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false);
  };


  let text;

  if (isLogged) {
    text = `Welcome ${localStorage.getItem('username')}, you are connected to studio!`;

    return <div style={containerStyles}>
      <h1 style={pageTitleStyles}></h1>
      <p style={pageSubTitleStyles}>{text}</p>

      <div style={navStyles}>
        <Link to="/projects">
          <button style={buttonStyles}>Personal Projects</button>
        </Link>
        <Link to="/orgProjects">
          <button style={buttonStyles}>Org Projects</button>
        </Link>
        <LogoutButton onClick={logout} />
      </div>

      <FetchMgmt/>
      <UpdateUserButton/>
    </div>;
  } else {
    text = 'You are not connected. Please log in.';

    return <div style={containerStyles}>
      <h1 style={pageTitleStyles}>Studio</h1>
      <p style={pageSubTitleStyles}>{text}</p>

      <div style={buttonContainerStyles}>
        <LoginButton providerName={'capsule'} />
      </div>
    </div>;
  }

}

export default Home;
