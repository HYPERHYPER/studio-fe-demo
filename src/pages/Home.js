import React, { useState } from 'react';
import FetchMgmt from '../components/FetchMgmt';
import UpdateUserButton from '../components/UpdateUserButton';

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

const LoginButton = (props) => <a href={`${backendUrl}/api/connect/${props.providerName}`}>
  <button style={buttonStyles}>Connect using {props.providerName}</button>
  </a>;
const LogoutButton = (props) => <button onClick={props.onClick}>Logout</button>;







const Home = (props) => {

  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));


  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false);
  };

  let buttons;

  if (isLogged) {
    buttons = <LogoutButton onClick={logout} />;
  } else {
    buttons = <ul style={{ listStyleType: 'none' }}>
      {providersNames.map((providerName, i) => <li key={providerName}>
        <LoginButton providerName={providerName}/>
        </li>)}
    </ul>;
  }

  let text;

  if (isLogged) {
    text = `Welcome ${localStorage.getItem('username')}, you are connected!`;

    return <div style={containerStyles}>
      <h1 style={pageTitleStyles}></h1>
      <p style={pageSubTitleStyles}>{text}</p>

      <div style={navStyles}>
        <button style={buttonStyles}>Home</button>
        <button style={buttonStyles}>About</button>
      </div>

       <div style={buttonContainerStyles}>
          {buttons}
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
        {buttons}
      </div>
    </div>;
  }

}

export default Home;
