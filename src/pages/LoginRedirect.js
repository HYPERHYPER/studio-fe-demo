import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";


const backendUrl = process.env.REACT_APP_BACKEND_URL;


const LoginRedirect = (props) => {
  const [text, setText] = useState('Loading...');
  const location = useLocation();
  const params = useParams();
  const history = useHistory();


  useEffect(() => {

    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search

    const url = `${backendUrl}/api/auth/capsule/callback${location.search}`

    // store capsule access token to local storage 
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('access_token');
    


    fetch(url)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi

        console.log(accessToken);

        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('id', res.user.id);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('accessToken', accessToken);
        setText('You have been successfully logged in studio. You will be redirected in a few seconds...');
        setTimeout(() => history.push('/'), 3000); // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err);
        setText('An error occurred, please see the developer console.')
      });
  }, [history, location.search, params.providerName]);

  return <p>{text}</p>
};

export default LoginRedirect;
