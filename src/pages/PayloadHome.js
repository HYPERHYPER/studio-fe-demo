import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";



const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
    color: 'white',
    marginBottom: '20px'
};


const LoginButton = (props) => <a href={`${backendUrl}/api/connect/capsule`}>
    <button style={buttonStyles}>Connect using Capsule</button>
</a>;
const LogoutButton = (props) => <button style={buttonStyles} onClick={props.onClick}>Logout</button>;

const Emoji = (props) => <span style={{ fontSize: '100px' }} rrole="img" aria-label="wave">👋</span>



const PayloadHome = (props) => {

    const history = useHistory();

    console.log(props);

    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('payload_jwt'));

    console.log(isLogged);


    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('payload_jwt');
        localStorage.removeItem('payload_username');
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        setIsLogged(false);
        history.push('/');
    };

    const handlePayloadBackend = (e) => {
        window.alert('Ask Bibek for Backend admin login!');
        window.open('https://studio-api-payload.herokuapp.com/admin', '_blank')
    }

    const handlePayloadDocs = (e) => {
        window.open('https://payloadcms.com/docs/getting-started/what-is-payload', '_blank')
    }


    let text;

    if (isLogged) {
        text = `Hello ${localStorage.getItem('payload_username')}, you are connected to Payload studio!`;

        const orgPath = 'projects?org=true';

        return <div style={containerStyles}>
            <p style={pageSubTitleStyles}>{text}</p>
            <Emoji />
            <div style={navStyles}>
                <button onClick={handlePayloadBackend} style={buttonStyles}>Payload Backend</button>
                <button onClick={handlePayloadDocs} style={buttonStyles}>Payload Docs</button>
                <Link to={{ pathname: "/payload/projects", state: {} }} >
                    <button style={buttonStyles}>Projects</button>
                </Link>
                <Link to={{ pathname: "/payload/projects", state: { orgPath } }} >
                    <button style={buttonStyles}>Org Projects</button>
                </Link>
                <LogoutButton onClick={logout} />
            </div>
            <p style={pageSubTitleStyles}>Powered by Payload </p>
        </div>;
    } else {
        text = 'You are not connected. Please log in.';

        return <div style={containerStyles}>
            <h1 style={pageTitleStyles}>Studio</h1>
            <p style={pageTitleStyles}>{text}</p>

            <div style={buttonContainerStyles}>
                <LoginButton providerName={'capsule'} />
            </div>
        </div>;
    }

}

export default PayloadHome;
